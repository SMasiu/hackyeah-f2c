import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import {
  TypeScriptGenericDeclarationBuilder,
  TypeScriptGenericDeclarationPayload
} from './typescript-generic-declaration.builder'
import { Builder } from '../../../core'

export interface TypeScriptDecoratorPayload {
  name: string
  isFactory: boolean
  args: TypeScriptExpressionPayload[]
  generics: TypeScriptGenericDeclarationPayload[]
}

export class TypeScriptDecoratorBuilder implements Builder<TypeScriptDecoratorPayload> {
  private name: string
  private isFactory = false
  private args: TypeScriptExpressionBuilder[] = []
  private generics: TypeScriptGenericDeclarationBuilder[] = []

  build(): TypeScriptDecoratorPayload {
    const { name, isFactory, args, generics } = this

    return {
      name,
      isFactory,
      args: args.map((arg) => arg.build()),
      generics: generics.map((generic) => generic.build())
    }
  }

  setName(name: string): TypeScriptDecoratorBuilder {
    this.name = name

    return this
  }

  markAsFactory(): TypeScriptDecoratorBuilder {
    this.isFactory = true

    return this
  }

  addArg(arg: TypeScriptExpressionBuilder): TypeScriptDecoratorBuilder {
    this.args.push(arg)

    return this
  }

  addArgs(args: TypeScriptExpressionBuilder[]): TypeScriptDecoratorBuilder {
    this.args.push(...args)

    return this
  }

  addGeneric(generic: TypeScriptGenericDeclarationBuilder): TypeScriptDecoratorBuilder {
    this.generics.push(generic)

    return this
  }

  addGenerics(generics: TypeScriptGenericDeclarationBuilder[]): TypeScriptDecoratorBuilder {
    this.generics.push(...generics)

    return this
  }
}

export const typeScriptDecoratorBuilderFactory = () => new TypeScriptDecoratorBuilder()

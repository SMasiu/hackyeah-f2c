import {
  TypeScriptArgumentDeclarationBuilder,
  TypeScriptArgumentDeclarationPayload
} from './typescript-argument-declaration.builder'
import {
  TypeScriptDecoratorBuilder,
  TypeScriptDecoratorPayload
} from './typescript-decorator.builder'
import {
  TypeScriptFunctionalityBuilder,
  TypeScriptFunctionalityPayload
} from './typescript-functionality.builder'
import {
  TypeScriptGenericDeclarationBuilder,
  TypeScriptGenericDeclarationPayload
} from './typescript-generic-declaration.builder'
import {
  TypeScriptTypeDeclarationBuilder,
  TypeScriptTypeDeclarationPayload
} from './typescript-type-declaration.builder'
import { Builder } from '../../../core'
import { TypeScriptAccessor, TypeScriptModifier } from '../typescript.types'

export interface TypeScriptClassMethodPayload {
  name: string
  returnType?: TypeScriptTypeDeclarationPayload
  modifier: TypeScriptModifier
  accessor?: TypeScriptAccessor
  isStatic: boolean
  isAbstract: boolean
  isAsync: boolean
  args: TypeScriptArgumentDeclarationPayload[]
  decorators: TypeScriptDecoratorPayload[]
  functionality: TypeScriptFunctionalityPayload
  generics: TypeScriptGenericDeclarationPayload[]
}

export class TypeScriptClassMethodBuilder implements Builder<TypeScriptClassMethodPayload> {
  private name: string
  private returnType: TypeScriptTypeDeclarationBuilder
  private modifier: TypeScriptModifier = TypeScriptModifier.PUBLIC
  private accessor: TypeScriptAccessor
  private isStatic = false
  private isAbstract = false
  private isAsync = false
  private args: TypeScriptArgumentDeclarationBuilder[] = []
  private decorators: TypeScriptDecoratorBuilder[] = []
  private functionality: TypeScriptFunctionalityBuilder
  private generics: TypeScriptGenericDeclarationBuilder[] = []

  build(): TypeScriptClassMethodPayload {
    const {
      name,
      returnType,
      modifier,
      accessor,
      args,
      decorators,
      isStatic,
      isAbstract,
      isAsync,
      functionality,
      generics
    } = this

    return {
      name,
      returnType: returnType?.build(),
      modifier,
      accessor,
      args: args.map((arg) => arg.build()),
      isStatic,
      isAbstract,
      isAsync,
      functionality: functionality.build(),
      decorators: decorators.map((decorator) => decorator.build()),
      generics: generics.map((generic) => generic.build())
    }
  }

  setName(name: string): TypeScriptClassMethodBuilder {
    this.name = name

    return this
  }

  setReturnType(returnType: TypeScriptTypeDeclarationBuilder): TypeScriptClassMethodBuilder {
    this.returnType = returnType

    return this
  }

  setModifier(modifier: TypeScriptModifier): TypeScriptClassMethodBuilder {
    this.modifier = modifier

    return this
  }

  setAccessor(accessor: TypeScriptAccessor): TypeScriptClassMethodBuilder {
    this.accessor = accessor

    return this
  }

  addArg(arg: TypeScriptArgumentDeclarationBuilder): TypeScriptClassMethodBuilder {
    this.args.push(arg)

    return this
  }

  addArgs(args: TypeScriptArgumentDeclarationBuilder[]): TypeScriptClassMethodBuilder {
    this.args.push(...args)

    return this
  }

  markAsStatic(): TypeScriptClassMethodBuilder {
    this.isStatic = true

    return this
  }

  markAsAbstract(): TypeScriptClassMethodBuilder {
    this.isAbstract = true

    return this
  }

  markAsAsync(): TypeScriptClassMethodBuilder {
    this.isAsync = true

    return this
  }

  addDecorator(decorator: TypeScriptDecoratorBuilder): TypeScriptClassMethodBuilder {
    this.decorators.push(decorator)

    return this
  }

  addDecorators(decorators: TypeScriptDecoratorBuilder[]): TypeScriptClassMethodBuilder {
    this.decorators.push(...decorators)

    return this
  }

  setFunctionality(functionality: TypeScriptFunctionalityBuilder): TypeScriptClassMethodBuilder {
    this.functionality = functionality

    return this
  }

  addGeneric(generic: TypeScriptGenericDeclarationBuilder): TypeScriptClassMethodBuilder {
    this.generics.push(generic)

    return this
  }

  addGenerics(generics: TypeScriptGenericDeclarationBuilder[]): TypeScriptClassMethodBuilder {
    this.generics.push(...generics)

    return this
  }
}

export const typeScriptClassMethodBuilderFactory = () => new TypeScriptClassMethodBuilder()

import {
  TypeScriptArgumentDeclarationBuilder,
  TypeScriptArgumentDeclarationPayload
} from './typescript-argument-declaration.builder'
import {
  TypeScriptFunctionalityBuilder,
  TypeScriptFunctionalityPayload
} from './typescript-functionality.builder'
import { Builder } from '../../../core'

export interface TypeScriptClassConstructorPayload {
  args: TypeScriptArgumentDeclarationPayload[]
  functionality?: TypeScriptFunctionalityPayload
}

export class TypeScriptClassConstructorBuilder
  implements Builder<TypeScriptClassConstructorPayload>
{
  private args: TypeScriptArgumentDeclarationBuilder[] = []
  private functionality: TypeScriptFunctionalityBuilder

  build(): TypeScriptClassConstructorPayload {
    const { args, functionality } = this

    return { args: args.map((arg) => arg.build()), functionality: functionality?.build() }
  }

  addArg(arg: TypeScriptArgumentDeclarationBuilder): TypeScriptClassConstructorBuilder {
    this.args.push(arg)

    return this
  }

  addArgs(args: TypeScriptArgumentDeclarationBuilder[]): TypeScriptClassConstructorBuilder {
    this.args.push(...args)

    return this
  }

  setFunctionality(
    functionality: TypeScriptFunctionalityBuilder
  ): TypeScriptClassConstructorBuilder {
    this.functionality = functionality

    return this
  }
}

export const typeScriptClassConstructorBuilderFactory = () =>
  new TypeScriptClassConstructorBuilder()

import {
  TypeScriptDecoratorBuilder,
  TypeScriptDecoratorPayload
} from './typescript-decorator.builder'
import {
  TypeScriptVariableDeclarationBuilder,
  TypeScriptVariableDeclarationPayload
} from './typescript-variable-declaration.builder'
import { Builder } from '../../../core'
import { TypeScriptModifier } from '../typescript.types'

export type TypeScriptArgumentDeclarationPayload = TypeScriptVariableDeclarationPayload & {
  decorators: TypeScriptDecoratorPayload[]
  modifier?: TypeScriptModifier
  isReadonly: boolean
  isRestParam: boolean
}

export class TypeScriptArgumentDeclarationBuilder
  extends TypeScriptVariableDeclarationBuilder
  implements Builder<TypeScriptArgumentDeclarationPayload>
{
  private decorators: TypeScriptDecoratorBuilder[] = []
  private modifier?: TypeScriptModifier
  private isReadonly = false
  private isRestParam = false

  build(): TypeScriptArgumentDeclarationPayload {
    const { type, defaultValue, decorators, modifier, isRestParam, isReadonly, value } = this

    return {
      value,
      type: type?.build(),
      modifier,
      isReadonly,
      isRestParam,
      defaultValue: defaultValue?.build(),
      decorators: decorators.map((decorator) => decorator.build())
    }
  }

  addDecorator(decorator: TypeScriptDecoratorBuilder): TypeScriptArgumentDeclarationBuilder {
    this.decorators.push(decorator)

    return this
  }

  addDecorators(decorators: TypeScriptDecoratorBuilder[]): TypeScriptArgumentDeclarationBuilder {
    this.decorators.push(...decorators)

    return this
  }

  setModifier(modifier: TypeScriptModifier): TypeScriptArgumentDeclarationBuilder {
    this.modifier = modifier

    return this
  }

  markAsReadonly(): TypeScriptArgumentDeclarationBuilder {
    this.isReadonly = true

    return this
  }

  markAsRestParam(): TypeScriptArgumentDeclarationBuilder {
    this.isRestParam = true

    return this
  }
}

export const typeScriptArgumentDeclarationBuilderFactory = () =>
  new TypeScriptArgumentDeclarationBuilder()

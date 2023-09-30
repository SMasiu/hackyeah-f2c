import {
  TypeScriptDecoratorBuilder,
  TypeScriptDecoratorPayload
} from './typescript-decorator.builder'
import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import {
  TypeScriptTypeDeclarationBuilder,
  TypeScriptTypeDeclarationPayload
} from './typescript-type-declaration.builder'
import { Builder } from '../../../core'
import { TypeScriptModifier } from '../typescript.types'

export interface TypeScriptClassPropertyPayload {
  name: string
  type: TypeScriptTypeDeclarationPayload
  modifier: TypeScriptModifier
  isStatic: boolean
  isAbstract: boolean
  isReadonly: boolean
  isOptional: boolean
  isNotNull: boolean
  defaultValue?: TypeScriptExpressionPayload
  decorators: TypeScriptDecoratorPayload[]
}

export class TypeScriptClassPropertyBuilder implements Builder<TypeScriptClassPropertyPayload> {
  private name: string
  private type: TypeScriptTypeDeclarationBuilder
  private modifier: TypeScriptModifier = TypeScriptModifier.PUBLIC
  private isStatic = false
  private isAbstract = false
  private isReadonly = false
  private isOptional = false
  private isNotNull = false
  private defaultValue: TypeScriptExpressionBuilder
  private decorators: TypeScriptDecoratorBuilder[] = []

  build(): TypeScriptClassPropertyPayload {
    const {
      name,
      type,
      modifier,
      decorators,
      isStatic,
      isAbstract,
      isReadonly,
      isOptional,
      isNotNull,
      defaultValue
    } = this

    return {
      name,
      type: type.build(),
      modifier,
      isStatic,
      isAbstract,
      isOptional,
      isNotNull,
      isReadonly,
      defaultValue: defaultValue?.build(),
      decorators: decorators.map((decorator) => decorator.build())
    }
  }

  setName(name: string): TypeScriptClassPropertyBuilder {
    this.name = name

    return this
  }

  setType(type: TypeScriptTypeDeclarationBuilder): TypeScriptClassPropertyBuilder {
    this.type = type

    return this
  }

  setModifier(modifier: TypeScriptModifier): TypeScriptClassPropertyBuilder {
    this.modifier = modifier

    return this
  }

  markAsStatic(): TypeScriptClassPropertyBuilder {
    this.isStatic = true

    return this
  }

  markAsAbstract(): TypeScriptClassPropertyBuilder {
    this.isAbstract = true

    return this
  }

  markAsReadonly(): TypeScriptClassPropertyBuilder {
    this.isReadonly = true

    return this
  }

  markAsOptional(): TypeScriptClassPropertyBuilder {
    this.isOptional = true
    this.isNotNull = false

    return this
  }

  markAsNotNull(): TypeScriptClassPropertyBuilder {
    this.isNotNull = true
    this.isOptional = false

    return this
  }

  setDefaultValue(defaultValue: TypeScriptExpressionBuilder): TypeScriptClassPropertyBuilder {
    this.defaultValue = defaultValue

    return this
  }

  addDecorator(decorator: TypeScriptDecoratorBuilder): TypeScriptClassPropertyBuilder {
    this.decorators.push(decorator)

    return this
  }

  addDecorators(decorators: TypeScriptDecoratorBuilder[]): TypeScriptClassPropertyBuilder {
    this.decorators.push(...decorators)

    return this
  }
}

export const typeScriptClassPropertyBuilderFactory = () => new TypeScriptClassPropertyBuilder()

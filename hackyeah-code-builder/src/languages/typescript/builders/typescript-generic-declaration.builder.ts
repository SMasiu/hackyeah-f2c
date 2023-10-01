import {
  TypeScriptTypeDeclarationBuilder,
  TypeScriptTypeDeclarationPayload
} from './typescript-type-declaration.builder'
import { Builder } from '../../../core'

export interface TypeScriptGenericDeclarationPayload {
  name: string
  extendedType?: TypeScriptTypeDeclarationPayload
  defaultType?: TypeScriptTypeDeclarationPayload
}

export class TypeScriptGenericDeclarationBuilder
  implements Builder<TypeScriptGenericDeclarationPayload>
{
  private name: string
  private extendedType: TypeScriptTypeDeclarationBuilder
  private defaultType: TypeScriptTypeDeclarationBuilder

  build(): TypeScriptGenericDeclarationPayload {
    const { name, extendedType, defaultType } = this

    return { name, extendedType: extendedType?.build(), defaultType: defaultType?.build() }
  }

  setName(name: string): TypeScriptGenericDeclarationBuilder {
    this.name = name

    return this
  }

  setExtendedType(
    extendedType: TypeScriptTypeDeclarationBuilder
  ): TypeScriptGenericDeclarationBuilder {
    this.extendedType = extendedType

    return this
  }

  setDefaultType(
    defaultType: TypeScriptTypeDeclarationBuilder
  ): TypeScriptGenericDeclarationBuilder {
    this.defaultType = defaultType

    return this
  }
}

export const typeScriptGenericDeclarationBuilderFactory = () =>
  new TypeScriptGenericDeclarationBuilder()

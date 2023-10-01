import {
  TypeScriptFunctionalityBuilder,
  TypeScriptFunctionalityPayload
} from './typescript-functionality.builder'
import { TypeScriptImportBuilder, TypeScriptImportPayload } from './typescript-import.builder'
import { Builder } from '../../../core'

export interface TypeScriptPayload {
  imports: TypeScriptImportPayload[]
  functionality?: TypeScriptFunctionalityPayload
}

export class TypeScriptBuilder implements Builder<TypeScriptPayload> {
  private imports: TypeScriptImportBuilder[] = []
  private functionality: TypeScriptFunctionalityBuilder

  build(): TypeScriptPayload {
    const { imports, functionality } = this

    return {
      imports: imports.map((importItem) => importItem.build()),
      functionality: functionality?.build()
    }
  }

  addImport(importItem: TypeScriptImportBuilder): TypeScriptBuilder {
    this.imports.push(importItem)

    return this
  }

  addImports(imports: TypeScriptImportBuilder[]): TypeScriptBuilder {
    this.imports.push(...imports)

    return this
  }

  setFunctionality(functionality: TypeScriptFunctionalityBuilder): TypeScriptBuilder {
    this.functionality = functionality

    return this
  }
}

export const typeScriptBuilderFactory = () => new TypeScriptBuilder()

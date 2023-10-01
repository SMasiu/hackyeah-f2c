import { Renderer, ApplicationFileContent } from '../../../core'
import { TypeScriptFunctionalityPayload } from '../builders'
import { TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptFunctionalityRendererDependencies {
  typescriptStatementRenderers: Record<TypeScriptStatementType, Renderer<unknown>>
}

export class TypeScriptFunctionalityRenderer implements Renderer<TypeScriptFunctionalityPayload> {
  constructor(private readonly dependencies: TypeScriptFunctionalityRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptFunctionalityPayload) {
    const { typescriptStatementRenderers } = this.dependencies

    for (const [index, statement] of payload.codeStatements.entries()) {
      if (index) {
        fileContent.startNewContent()
      }

      typescriptStatementRenderers[statement.statementType].render(fileContent, statement)
    }
  }
}

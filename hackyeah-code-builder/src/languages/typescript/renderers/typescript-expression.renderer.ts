import { Renderer, ApplicationFileContent } from '../../../core'
import { TypeScriptExpressionPayload } from '../builders'
import { TypeScriptExpressionType } from '../typescript.types'

export interface TypeScriptExpressionRendererDependencies {
  typescriptExpressionRenderers: Record<TypeScriptExpressionType, Renderer<unknown>>
}

export class TypeScriptExpressionRenderer implements Renderer<TypeScriptExpressionPayload> {
  constructor(private readonly dependencies: TypeScriptExpressionRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptExpressionPayload) {
    const { typescriptExpressionRenderers } = this.dependencies

    typescriptExpressionRenderers[payload.expressionType].render(fileContent, payload)
  }
}

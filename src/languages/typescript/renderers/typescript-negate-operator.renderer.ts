import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptNegateOperatorPayload } from '../builders'

export interface TypeScriptNegateOperatorRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptNegateOperatorRenderer implements Renderer<TypeScriptNegateOperatorPayload> {
  constructor(private readonly dependencies: TypeScriptNegateOperatorRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptNegateOperatorPayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { value } = payload

    fileContent.appendItemToContent('!')
    typeScriptExpressionRenderer.render(fileContent, value)
  }
}

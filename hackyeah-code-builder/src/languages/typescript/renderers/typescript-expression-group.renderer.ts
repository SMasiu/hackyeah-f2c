import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptExpressionGroupPayload } from '../builders'

export interface TypeScriptExpressionGroupRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptExpressionGroupRenderer
  implements Renderer<TypeScriptExpressionGroupPayload>
{
  constructor(private readonly dependencies: TypeScriptExpressionGroupRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptExpressionGroupPayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { expression } = payload

    fileContent.appendItemToContent('(')
    typeScriptExpressionRenderer.render(fileContent, expression)
    fileContent.appendItemToContent(')')
  }
}

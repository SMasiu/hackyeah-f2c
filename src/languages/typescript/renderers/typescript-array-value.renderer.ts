import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptArrayValuePayload } from '../builders'

export interface TypeScriptArrayValueRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptArrayValueRenderer implements Renderer<TypeScriptArrayValuePayload> {
  constructor(private readonly dependencies: TypeScriptArrayValueRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptArrayValuePayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { values } = payload

    fileContent.appendItemToContent('[')

    const lastIndex = values.length - 1

    for (const [index, value] of values.entries()) {
      typeScriptExpressionRenderer.render(fileContent, value)

      if (lastIndex !== index) {
        fileContent.appendItemToContent(',')
        fileContent.addSpacingToNextItem()
      }
    }

    fileContent.appendItemToContent(']')
  }
}

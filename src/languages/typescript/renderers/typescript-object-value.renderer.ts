import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptObjectValuePayload, TypeScriptObjectValueType } from '../builders'

export interface TypeScriptObjectValueRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptObjectValueRenderer implements Renderer<TypeScriptObjectValuePayload> {
  constructor(private readonly dependencies: TypeScriptObjectValueRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptObjectValuePayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { values } = payload

    fileContent.appendItemToContent('{')

    if (values.length) {
      fileContent.addSpacingToNextItem()
    }

    const lastValueIndex = values.length - 1

    for (const [index, value] of values.entries()) {
      if (value.type === TypeScriptObjectValueType.KEY) {
        if (typeof value.key === 'string') {
          fileContent.appendItemToContent(value.key)
        } else {
          fileContent.appendItemToContent('[')
          typeScriptExpressionRenderer.render(fileContent, value.key)
          fileContent.appendItemToContent(']')
        }

        fileContent.appendItemToContent(':')
        fileContent.addSpacingToNextItem()
        typeScriptExpressionRenderer.render(fileContent, value.value)
      } else {
        typeScriptExpressionRenderer.render(fileContent, value.expression)
      }

      if (lastValueIndex !== index) {
        fileContent.appendItemToContent(',')
      }

      fileContent.addSpacingToNextItem()
    }

    fileContent.appendItemToContent('}')
  }
}

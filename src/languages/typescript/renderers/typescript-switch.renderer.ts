import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { TypeScriptFunctionalityRenderer } from './typescript-functionality.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptSwitchPayload } from '../builders'

export interface TypeScriptSwitchRendererDependencies {
  typeScriptFunctionalityRenderer: TypeScriptFunctionalityRenderer
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptSwitchRenderer implements Renderer<TypeScriptSwitchPayload> {
  constructor(private readonly dependencies: TypeScriptSwitchRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptSwitchPayload) {
    const { typeScriptExpressionRenderer, typeScriptFunctionalityRenderer } = this.dependencies
    const { expression, paths, fallback } = payload

    fileContent.appendItemToContent('switch')
    fileContent.appendItemToContentWithSpacing('(')

    typeScriptExpressionRenderer.render(fileContent, expression)

    fileContent.appendItemToContent(')')

    fileContent.appendItemToContentWithSpacing('{')
    fileContent.pushIndentation()

    for (const path of paths) {
      fileContent.startNewContent()
      fileContent.appendItemToContent('case')
      fileContent.addSpacingToNextItem()

      typeScriptExpressionRenderer.render(fileContent, path.value)

      fileContent.appendItemToContent(':')
      fileContent.appendItemToContentWithSpacing('{')
      fileContent.pushIndentation()
      fileContent.startNewContent()

      typeScriptFunctionalityRenderer.render(fileContent, path.functionality)

      fileContent.popIndentation()
      fileContent.startNewContent()
      fileContent.appendItemToContent('}')
    }

    if (fallback) {
      fileContent.startNewContent()
      fileContent.appendItemToContent('default')
      fileContent.appendItemToContent(':')
      fileContent.appendItemToContentWithSpacing('{')
      fileContent.pushIndentation()
      fileContent.startNewContent()

      typeScriptFunctionalityRenderer.render(fileContent, fallback)

      fileContent.popIndentation()
      fileContent.startNewContent()
      fileContent.appendItemToContent('}')
    }

    fileContent.popIndentation()
    fileContent.startNewContent()
    fileContent.appendItemToContent('}')
  }
}

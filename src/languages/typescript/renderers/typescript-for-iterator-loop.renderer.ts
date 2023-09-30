import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { TypeScriptFunctionalityRenderer } from './typescript-functionality.renderer'
import { TypeScriptReassignReferenceRenderer } from './typescript-reassign-reference.renderer'
import { TypeScriptVariableRenderer } from './typescript-variable.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptForIteratorLoopPayload } from '../builders'

export interface TypeScriptForIteratorLoopRendererDependencies {
  typeScriptVariableRenderer: TypeScriptVariableRenderer
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
  typeScriptReassignReferenceRenderer: TypeScriptReassignReferenceRenderer
  typeScriptFunctionalityRenderer: TypeScriptFunctionalityRenderer
}

export class TypeScriptForIteratorLoopRenderer
  implements Renderer<TypeScriptForIteratorLoopPayload>
{
  constructor(private readonly dependencies: TypeScriptForIteratorLoopRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptForIteratorLoopPayload) {
    const {
      typeScriptExpressionRenderer,
      typeScriptFunctionalityRenderer,
      typeScriptReassignReferenceRenderer,
      typeScriptVariableRenderer
    } = this.dependencies
    const { variable, expression, reassignVariable, functionality } = payload

    fileContent.appendItemToContent('for')
    fileContent.appendItemToContentWithSpacing('(')

    typeScriptVariableRenderer.render(fileContent, variable)

    fileContent.appendItemToContent(';')
    fileContent.addSpacingToNextItem()

    typeScriptExpressionRenderer.render(fileContent, expression)

    fileContent.appendItemToContent(';')
    fileContent.addSpacingToNextItem()

    typeScriptReassignReferenceRenderer.render(fileContent, reassignVariable)

    fileContent.appendItemToContent(')')

    fileContent.appendItemToContentWithSpacing('{')
    fileContent.pushIndentation()
    fileContent.startNewContent()

    typeScriptFunctionalityRenderer.render(fileContent, functionality)

    fileContent.popIndentation()
    fileContent.startNewContent()
    fileContent.appendItemToContent('}')
  }
}

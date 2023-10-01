import { TypeScriptConstantRenderer } from './typescript-constant.renderer'
import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { TypeScriptFunctionalityRenderer } from './typescript-functionality.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptForEachLoopPayload } from '../builders'
import { TypeScriptForEachType } from '../typescript.types'

export interface TypeScriptForEachLoopRendererDependencies {
  typeScriptConstantRenderer: TypeScriptConstantRenderer
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
  typeScriptFunctionalityRenderer: TypeScriptFunctionalityRenderer
}

export class TypeScriptForEachLoopRenderer implements Renderer<TypeScriptForEachLoopPayload> {
  constructor(private readonly dependencies: TypeScriptForEachLoopRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptForEachLoopPayload) {
    const {
      typeScriptConstantRenderer,
      typeScriptExpressionRenderer,
      typeScriptFunctionalityRenderer
    } = this.dependencies
    const { constant, iterable, functionality, type } = payload

    fileContent.appendItemToContent('for')
    fileContent.appendItemToContentWithSpacing('(')

    typeScriptConstantRenderer.render(fileContent, constant)

    fileContent.appendItemToContentWithSpacing(type === TypeScriptForEachType.ARRAY ? 'of' : 'in')
    fileContent.addSpacingToNextItem()

    typeScriptExpressionRenderer.render(fileContent, iterable)

    fileContent.appendItemToContent(')')
    fileContent.appendItemToContentWithSpacing('{')

    fileContent.pushIndentation()
    fileContent.startNewContent()

    typeScriptFunctionalityRenderer.render(fileContent, functionality)

    fileContent.popIndentation()
    fileContent.startNewContent()
    fileContent.appendItemToContentWithSpacing('}')
  }
}

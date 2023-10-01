import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptThrowPayload } from '../builders'

export interface TypeScriptThrowRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptThrowRenderer implements Renderer<TypeScriptThrowPayload> {
  constructor(private readonly dependencies: TypeScriptThrowRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptThrowPayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { expression } = payload

    fileContent.appendItemToContent('throw')
    fileContent.addSpacingToNextItem()

    typeScriptExpressionRenderer.render(fileContent, expression)
  }
}

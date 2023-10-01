import { TypeScriptVariableDeclarationRenderer } from './typescript-variable-declaration.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptConstantPayload } from '../builders'

export interface TypeScriptConstantRendererDependencies {
  typeScriptVariableDeclarationRenderer: TypeScriptVariableDeclarationRenderer
}

export class TypeScriptConstantRenderer implements Renderer<TypeScriptConstantPayload> {
  constructor(private readonly dependencies: TypeScriptConstantRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptConstantPayload) {
    const { typeScriptVariableDeclarationRenderer } = this.dependencies
    const { isExported } = payload

    if (isExported) {
      fileContent.appendItemToContent('export')
      fileContent.addSpacingToNextItem()
    }

    fileContent.appendItemToContent('const')
    fileContent.addSpacingToNextItem()

    typeScriptVariableDeclarationRenderer.render(fileContent, payload)
  }
}

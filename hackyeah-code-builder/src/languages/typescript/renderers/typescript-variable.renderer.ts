import { TypeScriptVariableDeclarationRenderer } from './typescript-variable-declaration.renderer'
import { Renderer, ApplicationFileContent } from '../../../core'
import { TypeScriptVariablePayload } from '../builders'

export interface TypeScriptVariableRendererDependencies {
  typeScriptVariableDeclarationRenderer: TypeScriptVariableDeclarationRenderer
}

export class TypeScriptVariableRenderer implements Renderer<TypeScriptVariablePayload> {
  constructor(private readonly dependencies: TypeScriptVariableRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptVariablePayload) {
    const { typeScriptVariableDeclarationRenderer } = this.dependencies
    const { isExported } = payload

    if (isExported) {
      fileContent.appendItemToContent('export')
      fileContent.addSpacingToNextItem()
    }

    fileContent.appendItemToContent('let')
    fileContent.addSpacingToNextItem()

    typeScriptVariableDeclarationRenderer.render(fileContent, payload)
  }
}

import { TypeScriptVariableDeclarationRenderer } from './typescript-variable-declaration.renderer'
import { Renderer, ApplicationFileContent } from '../../../core'
import { TypeScriptArgumentDeclarationPayload } from '../builders'

export interface TypeScriptArgumentDeclarationRendererDependencies {
  typeScriptVariableDeclarationRenderer: TypeScriptVariableDeclarationRenderer
}

export class TypeScriptArgumentDeclarationRenderer
  implements Renderer<TypeScriptArgumentDeclarationPayload>
{
  constructor(private readonly dependencies: TypeScriptArgumentDeclarationRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptArgumentDeclarationPayload) {
    const { typeScriptVariableDeclarationRenderer } = this.dependencies

    if (payload.isRestParam) {
      fileContent.appendItemToContent('...')
    }

    typeScriptVariableDeclarationRenderer.render(fileContent, payload)
  }
}

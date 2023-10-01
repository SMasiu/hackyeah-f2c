import { TypeScriptFunctionalityRenderer } from './typescript-functionality.renderer'
import { Renderer, ApplicationFileContent } from '../../../core'
import { TypeScriptPayload } from '../builders'

export interface TypeScriptRendererDependencies {
  typeScriptFunctionalityRenderer: TypeScriptFunctionalityRenderer
}
export class TypeScriptRenderer implements Renderer<TypeScriptPayload> {
  constructor(private readonly dependencies: TypeScriptRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptPayload) {
    const { typeScriptFunctionalityRenderer } = this.dependencies
    const { functionality } = payload

    if (functionality) {
      fileContent.startNewContent()
      typeScriptFunctionalityRenderer.render(fileContent, functionality)
    }
  }
}

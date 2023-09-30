import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptContinuePayload } from '../builders'

export class TypeScriptContinueRenderer implements Renderer<TypeScriptContinuePayload> {
  render(fileContent: ApplicationFileContent) {
    fileContent.appendItemToContent('continue')
  }
}

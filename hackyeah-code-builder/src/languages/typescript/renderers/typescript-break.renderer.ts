import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptBreakPayload } from '../builders'

export class TypeScriptBreakRenderer implements Renderer<TypeScriptBreakPayload> {
  render(fileContent: ApplicationFileContent) {
    fileContent.appendItemToContent('break')
  }
}

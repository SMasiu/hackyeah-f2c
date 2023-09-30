import { Renderer, ApplicationFileContent } from '../../../core'
import { TypeScriptPrimitiveValuePayload } from '../builders'
import { TypeScriptPrimitiveType } from '../typescript.types'

export class TypeScriptPrimitiveValueRenderer implements Renderer<TypeScriptPrimitiveValuePayload> {
  private codePrimitiveValueRendererMap: Record<
    TypeScriptPrimitiveType,
    (value: string) => string
  > = {
    STRING: (value: string) => `'${value}'`,
    NUMBER: (value: string) => value,
    BOOLEAN: (value: string) => value,
    UNDEFINED: () => 'undefined',
    NULL: () => 'null'
  }

  render(fileContent: ApplicationFileContent, payload: TypeScriptPrimitiveValuePayload) {
    const { type, value } = payload

    fileContent.appendItemToContent(this.codePrimitiveValueRendererMap[type](value))
  }
}

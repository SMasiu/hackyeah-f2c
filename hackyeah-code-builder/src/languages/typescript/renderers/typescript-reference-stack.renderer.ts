import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import {
  TypeScriptReferenceStackCallPayload,
  TypeScriptReferenceStackExpressionPayload,
  TypeScriptReferenceStackIndexPayload,
  TypeScriptReferenceStackPayload,
  TypeScriptReferenceStackPropertyCallPayload,
  TypeScriptReferenceStackPropertyIndexPayload,
  TypeScriptReferenceStackType,
  TypeScriptReferenceStackValuePayload
} from '../builders'

export interface TypeScriptReferenceStackRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptReferenceStackRenderer implements Renderer<TypeScriptReferenceStackPayload> {
  private stackTypeMap: Record<
    TypeScriptReferenceStackType,
    (fileContent: ApplicationFileContent, payload: unknown) => void
  > = {
    VALUE: (fileContent: ApplicationFileContent, payload: TypeScriptReferenceStackValuePayload) => {
      fileContent.appendItemToContent(payload.name)
    },
    INDEX: (fileContent: ApplicationFileContent, payload: TypeScriptReferenceStackIndexPayload) => {
      fileContent.appendItemToContent('[')
      this.dependencies.typeScriptExpressionRenderer.render(fileContent, payload.index)
      fileContent.appendItemToContent(']')
    },
    PROPERTY_INDEX: (
      fileContent: ApplicationFileContent,
      payload: TypeScriptReferenceStackPropertyIndexPayload
    ) => {
      fileContent.appendItemToContent(payload.name)
      fileContent.appendItemToContent('[')
      this.dependencies.typeScriptExpressionRenderer.render(fileContent, payload.index)
      fileContent.appendItemToContent(']')
    },
    CALL: (fileContent: ApplicationFileContent, payload: TypeScriptReferenceStackCallPayload) => {
      fileContent.appendItemToContent('(')

      if (payload.args) {
        const lastArgIndex = payload.args.length - 1

        for (const [index, arg] of payload.args.entries()) {
          this.dependencies.typeScriptExpressionRenderer.render(fileContent, arg)

          if (lastArgIndex !== index) {
            fileContent.appendItemToContent(',')
            fileContent.addSpacingToNextItem()
          }
        }
      }

      fileContent.appendItemToContent(')')
    },
    PROPERTY_CALL: (
      fileContent: ApplicationFileContent,
      payload: TypeScriptReferenceStackPropertyCallPayload
    ) => {
      fileContent.appendItemToContent(payload.name)

      fileContent.appendItemToContent('(')

      if (payload.args) {
        const lastArgIndex = payload.args.length - 1

        for (const [index, arg] of payload.args.entries()) {
          this.dependencies.typeScriptExpressionRenderer.render(fileContent, arg)

          if (lastArgIndex !== index) {
            fileContent.appendItemToContent(',')
            fileContent.addSpacingToNextItem()
          }
        }
      }

      fileContent.appendItemToContent(')')
    },
    EXPRESSION: (
      fileContent: ApplicationFileContent,
      payload: TypeScriptReferenceStackExpressionPayload
    ) => {
      this.dependencies.typeScriptExpressionRenderer.render(fileContent, payload.expression)
    }
  }

  constructor(private readonly dependencies: TypeScriptReferenceStackRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptReferenceStackPayload) {
    const dotTypes = [
      TypeScriptReferenceStackType.VALUE,
      TypeScriptReferenceStackType.PROPERTY_INDEX,
      TypeScriptReferenceStackType.PROPERTY_CALL
    ]

    for (const [index, value] of payload.reference.entries()) {
      if (index !== 0) {
        if (value.optionalChaining) {
          fileContent.appendItemToContent('?.')
        } else if (dotTypes.includes(value.type)) {
          fileContent.appendItemToContent('.')
        }
      }

      this.stackTypeMap[value.type](fileContent, value)
    }
  }
}

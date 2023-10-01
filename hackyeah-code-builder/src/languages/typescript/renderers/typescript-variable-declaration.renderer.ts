import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { Renderer, ApplicationFileContent } from '../../../core'
import {
  TypeScriptDestructureType,
  TypeScriptVariableDeclarationPayload,
  TypesScriptVariableDeclarationArrayValue,
  TypesScriptVariableDeclarationNestedObjectValue,
  TypesScriptVariableDeclarationObjectValue,
  TypesScriptVariableDeclarationRenameValue,
  TypesScriptVariableDeclarationSpreadValue,
  TypesScriptVariableDeclarationValue
} from '../builders'

export interface TypeScriptVariableDeclarationRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptVariableDeclarationRenderer
  implements Renderer<TypeScriptVariableDeclarationPayload>
{
  private variableDestructureMap: Record<
    TypeScriptDestructureType,
    (fileContent: ApplicationFileContent, payload: unknown) => void
  > = {
    RENAME: this.renderDestructureRename.bind(this),
    ARRAY: this.renderDestructureArray.bind(this),
    OBJECT: this.renderDestructureObject.bind(this),
    NESTED_OBJECT: this.renderDestructureNestedObject.bind(this),
    SPREAD: this.renderDestructureSpread.bind(this)
  }

  constructor(private readonly dependencies: TypeScriptVariableDeclarationRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptVariableDeclarationPayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { value, defaultValue } = payload

    this.renderDestructure(fileContent, value)

    if (defaultValue) {
      fileContent.appendItemToContentWithSpacing('=')
      fileContent.addSpacingToNextItem()
      typeScriptExpressionRenderer.render(fileContent, defaultValue)
    }
  }

  private renderDestructure(
    fileContent: ApplicationFileContent,
    payload: TypesScriptVariableDeclarationValue
  ) {
    if (typeof payload === 'string') {
      fileContent.appendItemToContent(payload)
    } else {
      this.variableDestructureMap[payload.destructure](fileContent, payload)
    }
  }

  private renderDestructureRename(
    fileContent: ApplicationFileContent,
    payload: TypesScriptVariableDeclarationRenameValue
  ) {
    fileContent.appendItemToContent(payload.currentKey)
    fileContent.appendItemToContent(':')
    fileContent.appendItemToContentWithSpacing(payload.renamedKey)
  }

  private renderDestructureArray(
    fileContent: ApplicationFileContent,
    payload: TypesScriptVariableDeclarationArrayValue
  ) {
    fileContent.appendItemToContent('[')

    const lastItemIndex = payload.items.length - 1

    for (const [index, item] of payload.items.entries()) {
      this.renderDestructure(fileContent, item)

      if (lastItemIndex !== index) {
        fileContent.appendItemToContent(',')
        fileContent.addSpacingToNextItem()
      }
    }

    fileContent.appendItemToContent(']')
  }

  private renderDestructureObject(
    fileContent: ApplicationFileContent,
    payload: TypesScriptVariableDeclarationObjectValue
  ) {
    fileContent.appendItemToContent('{')
    fileContent.addSpacingToNextItem()

    const lastItemIndex = payload.items.length - 1

    for (const [index, item] of payload.items.entries()) {
      this.renderDestructure(fileContent, item)

      if (lastItemIndex !== index) {
        fileContent.appendItemToContent(',')
        fileContent.addSpacingToNextItem()
      }
    }

    fileContent.appendItemToContentWithSpacing('}')
  }

  private renderDestructureNestedObject(
    fileContent: ApplicationFileContent,
    payload: TypesScriptVariableDeclarationNestedObjectValue
  ) {
    fileContent.appendItemToContent(payload.currentKey)
    fileContent.appendItemToContent(':')

    fileContent.appendItemToContentWithSpacing('{')
    fileContent.addSpacingToNextItem()

    const lastItemIndex = payload.items.length - 1

    for (const [index, item] of payload.items.entries()) {
      this.renderDestructure(fileContent, item)

      if (lastItemIndex !== index) {
        fileContent.appendItemToContent(',')
        fileContent.addSpacingToNextItem()
      }
    }

    fileContent.appendItemToContentWithSpacing('}')
  }

  private renderDestructureSpread(
    fileContent: ApplicationFileContent,
    payload: TypesScriptVariableDeclarationSpreadValue
  ) {
    const { typeScriptExpressionRenderer } = this.dependencies

    fileContent.appendItemToContent('...')
    typeScriptExpressionRenderer.render(fileContent, payload.item)
  }
}

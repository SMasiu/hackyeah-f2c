import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { TypeScriptReferenceStackRenderer } from './typescript-reference-stack.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptReassignReferencePayload } from '../builders'
import { TypeScriptMathOperator } from '../typescript.types'

export interface TypeScriptReassignReferenceRendererDependencies {
  typeScriptReferenceStackRenderer: TypeScriptReferenceStackRenderer
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptReassignReferenceRenderer
  implements Renderer<TypeScriptReassignReferencePayload>
{
  private mathOperatorMap: Record<TypeScriptMathOperator, string> = {
    ADD: '+',
    SUBTRACT: '-',
    DIVIDE: '/',
    MULTIPLY: '*',
    POWER: '**'
  }

  constructor(private readonly dependencies: TypeScriptReassignReferenceRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptReassignReferencePayload) {
    const { typeScriptExpressionRenderer, typeScriptReferenceStackRenderer } = this.dependencies
    const { reference, mathOperator, value } = payload

    typeScriptReferenceStackRenderer.render(fileContent, reference)
    fileContent.addSpacingToNextItem()

    if (mathOperator) {
      fileContent.appendItemToContent(this.mathOperatorMap[mathOperator])
    }

    fileContent.appendItemToContent('=')
    fileContent.addSpacingToNextItem()

    typeScriptExpressionRenderer.render(fileContent, value)
  }
}

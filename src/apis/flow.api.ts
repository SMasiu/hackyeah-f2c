import { Api, ApiExpressionGenerators, ApiFlowGenerators, DefaultApiState } from './api'

export abstract class FlowApi<TState = DefaultApiState> extends Api<TState> {
  flowGenerators: ApiFlowGenerators<TState> = {
    'flow:input:ref': this.generateInputRef.bind(this),
    'flow:output:success': this.generateOutputSuccess.bind(this),
    'flow:condition:expression-to-flow': this.generateExpressionToFlow.bind(this),
    'flow:loop:range': this.generateLoopRange.bind(this),
    'flow:loop:while': this.generateLoopWhile.bind(this),
    'flow:loop:do-while': this.generateLoopDoWhile.bind(this),
    'flow:loop:infinite': this.generateLoopInfinite.bind(this),
    'flow:loop:break': this.generateLoopBreak.bind(this),
    'flow:loop:continue': this.generateLoopContinue.bind(this)
  }
  expressionGenerators: ApiExpressionGenerators<TState> = {
    'flow:reference:variable': this.generateReferenceVariable.bind(this),
    'flow:condition:expression-to-expression': this.generateConditionalExpression.bind(this)
  }

  abstract generateInputRef(state: TState): void
  abstract generateOutputSuccess(state: TState): void
  abstract generateExpressionToFlow(state: TState): void
  abstract generateLoopRange(state: TState): void
  abstract generateLoopWhile(state: TState): void
  abstract generateLoopDoWhile(state: TState): void
  abstract generateLoopInfinite(state: TState): void
  abstract generateReferenceVariable(state: TState): void
  abstract generateConditionalExpression(state: TState): void
  abstract generateLoopBreak(state: TState): void
  abstract generateLoopContinue(state: TState): void
}

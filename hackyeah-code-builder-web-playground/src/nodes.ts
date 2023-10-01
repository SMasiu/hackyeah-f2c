import { ArrayNewItemControl } from "./components/controls/array-new-item-control";
import { BooleanControl } from "./components/controls/boolean-control";
import { ExpressionToExpressionControl } from "./components/controls/expression-to-expression-control";
import { ExpressionToFlowControl } from "./components/controls/expression-to-flow-control";
import { InputExpressionControl } from "./components/controls/input-expression-control";
import { NumberControl } from "./components/controls/number-control";
import { OutputExpressionControl } from "./components/controls/output-expression-control";
import { OutputFlowControl } from "./components/controls/output-flow-control";
import { TextControl } from "./components/controls/text-control";
import { FunctionalityNode } from "./components/nodes/functionality-node";
import { PipeNode } from "./components/nodes/pipe-node";
import { ReferenceNode } from "./components/nodes/reference-node";

export const nodeTypes = {
  referenceNode: ReferenceNode,
  functionalityNode: FunctionalityNode,
  pipeNode: PipeNode,
};

export const controlTypes = {
  inputExpressionControl: InputExpressionControl,
  outputExpressionControl: OutputExpressionControl,
  outputFlowControl: OutputFlowControl,
  expressionToExpressionControl: ExpressionToExpressionControl,
  expressionToFlowControl: ExpressionToFlowControl,
  numberControl: NumberControl,
  textControl: TextControl,
  booleanControl: BooleanControl,
  arrayNewItemControl: ArrayNewItemControl,
};

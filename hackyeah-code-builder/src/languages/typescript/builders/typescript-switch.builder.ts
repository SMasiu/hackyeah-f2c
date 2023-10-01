import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import {
  TypeScriptFunctionalityBuilder,
  TypeScriptFunctionalityPayload
} from './typescript-functionality.builder'
import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptSwitchPathPayload {
  value: TypeScriptExpressionPayload
  functionality: TypeScriptFunctionalityPayload
}

export interface TypeScriptSwitchPath {
  value: TypeScriptExpressionBuilder
  functionality: TypeScriptFunctionalityBuilder
}

export interface TypeScriptSwitchPayload {
  statementType: TypeScriptStatementType.SWITCH
  paths: TypeScriptSwitchPathPayload[]
  fallback?: TypeScriptFunctionalityPayload
  expression: TypeScriptExpressionPayload
}

export class TypeScriptSwitchBuilder implements Builder<TypeScriptSwitchPayload> {
  private paths: TypeScriptSwitchPath[] = []
  private fallback?: TypeScriptFunctionalityBuilder
  private expression: TypeScriptExpressionBuilder

  build(): TypeScriptSwitchPayload {
    const { paths, fallback, expression } = this

    return {
      statementType: TypeScriptStatementType.SWITCH,
      paths: paths.map((path) => ({
        value: path.value.build(),
        functionality: path.functionality.build()
      })),
      expression: expression.build(),
      fallback: fallback?.build()
    }
  }

  setFallback(fallback: TypeScriptFunctionalityBuilder): TypeScriptSwitchBuilder {
    this.fallback = fallback

    return this
  }

  setExpression(expression: TypeScriptExpressionBuilder): TypeScriptSwitchBuilder {
    this.expression = expression

    return this
  }

  addPath(path: TypeScriptSwitchPath): TypeScriptSwitchBuilder {
    this.paths.push(path)

    return this
  }

  addPaths(paths: TypeScriptSwitchPath[]): TypeScriptSwitchBuilder {
    this.paths.push(...paths)

    return this
  }
}

export const typeScriptSwitchBuilderFactory = () => new TypeScriptSwitchBuilder()

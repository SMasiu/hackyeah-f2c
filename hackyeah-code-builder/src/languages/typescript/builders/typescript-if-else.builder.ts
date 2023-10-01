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

export interface TypeScriptIfElsePathPayload {
  expression: TypeScriptExpressionPayload
  functionality: TypeScriptFunctionalityPayload
}

export interface TypeScriptIfElsePath {
  expression: TypeScriptExpressionBuilder
  functionality: TypeScriptFunctionalityBuilder
}

export interface TypeScriptIfElsePayload {
  statementType: TypeScriptStatementType.IF_ELSE
  paths: TypeScriptIfElsePathPayload[]
  fallback?: TypeScriptFunctionalityPayload
}

export class TypeScriptIfElseBuilder implements Builder<TypeScriptIfElsePayload> {
  private paths: TypeScriptIfElsePath[] = []
  private fallback?: TypeScriptFunctionalityBuilder

  build(): TypeScriptIfElsePayload {
    const { paths, fallback } = this

    return {
      statementType: TypeScriptStatementType.IF_ELSE,
      paths: paths.map((path) => ({
        expression: path.expression.build(),
        functionality: path.functionality.build()
      })),
      fallback: fallback?.build()
    }
  }

  setFallback(fallback: TypeScriptFunctionalityBuilder): TypeScriptIfElseBuilder {
    this.fallback = fallback

    return this
  }

  addPath(path: TypeScriptIfElsePath): TypeScriptIfElseBuilder {
    this.paths.push(path)

    return this
  }

  addPaths(paths: TypeScriptIfElsePath[]): TypeScriptIfElseBuilder {
    this.paths.push(...paths)

    return this
  }
}

export const typeScriptIfElseBuilderFactory = () => new TypeScriptIfElseBuilder()

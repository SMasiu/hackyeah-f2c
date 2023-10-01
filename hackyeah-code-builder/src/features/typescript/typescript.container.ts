import { asClass, AwilixContainer } from 'awilix'
import { TypeScriptBooleanApi } from './apis/typescript-boolean.api'
import { TypeScriptFlowApi } from './apis/typescript-flow.api'
import { TypeScriptLoggerApi } from './apis/typescript-logger.api'
import { TypeScriptLogicApi } from './apis/typescript-logic.api'
import { TypeScriptNumberApi } from './apis/typescript-number.api'
import { TypeScriptStringApi } from './apis/typescript-string.api'
import { TypeScriptApiState } from './apis/typescript.api'
import { TypeScriptClusterBranchGenerator } from './generators/typescript-cluster-branch.generator'
import { TypeScriptClusterComparatorGenerator } from './generators/typescript-cluster-comparator.generator'
import { TypeScriptClusterExpressionGenerator } from './generators/typescript-cluster-expression.generator'
import { TypeScriptClusterInputGenerator } from './generators/typescript-cluster-input.generator'
import { TypeScriptClusterSetVariableGenerator } from './generators/typescript-cluster-set-variable.generator'
import { TypeScriptClusterGenerator } from './generators/typescript-cluster.generator'
import { TypeScriptFeatureGenerator } from './generators/typescript-feature.generator'
import { Api } from '../../apis/api'
import { asDictionary } from '../../utils'

export const registerFeatureBuilder = (container: AwilixContainer) => {
  container.register({
    typeScriptClusterGenerator: asClass(TypeScriptClusterGenerator).singleton(),
    typeScriptClusterBranchGenerator: asClass(TypeScriptClusterBranchGenerator).singleton(),
    typeScriptClusterExpressionGenerator: asClass(TypeScriptClusterExpressionGenerator).singleton(),
    typeScriptClusterInputGenerator: asClass(TypeScriptClusterInputGenerator).singleton(),
    typeScriptClusterComparatorGenerator: asClass(TypeScriptClusterComparatorGenerator).singleton(),
    typeScriptClusterSetVariableGenerator: asClass(
      TypeScriptClusterSetVariableGenerator
    ).singleton(),
    typescriptApis: asDictionary<Api<TypeScriptApiState>>({
      logger: asClass(TypeScriptLoggerApi).singleton(),
      number: asClass(TypeScriptNumberApi).singleton(),
      string: asClass(TypeScriptStringApi).singleton(),
      boolean: asClass(TypeScriptBooleanApi).singleton(),
      flow: asClass(TypeScriptFlowApi).singleton(),
      logic: asClass(TypeScriptLogicApi).singleton()
    })
  })

  return asClass(TypeScriptFeatureGenerator).singleton()
}

import { v4 as uuid } from 'uuid'
import { ApplicationDto, ApplicationType, Language } from '../src/models'
import { staticTypeScriptFeatureBuilder } from './feature-builder.static'

const applicationId = uuid()
const projectId = uuid()

export const staticApplication: ApplicationDto = {
  id: applicationId,
  name: 'Api',
  type: ApplicationType.API,
  projectId,
  featureBuilders: [
    {
      config: {},
      applicationId,
      featureBuilderId: staticTypeScriptFeatureBuilder.id,
      languages: [Language.TYPESCRIPT]
    }
  ]
}

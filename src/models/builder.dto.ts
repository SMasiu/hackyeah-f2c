import { ApplicationType } from './application.dto'

export enum FeatureBuilderResource {
  ORM = 'ORM',
  REPOSITORY = 'REPOSITORY',
  VALIDATION = 'VALIDATION',
  STORE = 'STORE',
  FUNCTIONALITY = 'FUNCTIONALITY'
}

export interface ApplicationBuilderDto {
  id: string
  name: string
  resource: ApplicationType
  description: string
  logoUrl: string
  tags: string[]
}

export interface FeatureBuilderDto {
  id: string
  name: string
  description: string
  logoUrl: string
  tags: string[]
  isGlobal: boolean
  resource: FeatureBuilderResource
  applicationBuilderId: string
}

export enum ApplicationType {
  API = 'API',
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP'
}

export enum Language {
  TYPESCRIPT = 'typescript'
}

export interface SelectedApplicationBuilderDto {
  config: object
  applicationId: string
  applicationBuilderId: string
  languages: Language[]
}

export interface SelectedFeatureBuilderDto {
  config: object
  applicationId: string
  featureBuilderId: string
  languages: Language[]
}

export interface ApplicationInfrastructureDto {
  id: string
  name: string
  description: string
  config: object
  infrastructureId: string
  applicationId: string
}

export interface ApplicationDto {
  id: string
  name: string
  type: ApplicationType
  projectId: string
  featureBuilders: SelectedFeatureBuilderDto[]
}

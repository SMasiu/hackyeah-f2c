export enum ApplicationResourceType {
  MODEL = 'MODEL',
  ACTION = 'ACTION',
  HANDLER = 'HANDLER',
  HANDLER_ENTRY = 'HANDLER_ENTRY'
}

export interface ApplicationResource {
  id: string
  type: ApplicationResourceType
  name: string
  applicationFileId: string
}

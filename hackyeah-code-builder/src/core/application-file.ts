import { join } from 'path'
import { Builder } from './builder'
import { Language } from '../models'

export enum ApplicationFileType {
  DATABASE_SCHEMA = 'DATABASE_SCHEMA',
  TYPE = 'TYPE',
  FUNCTIONALITY = 'FUNCTIONALITY',
  CONFIG = 'CONFIG',
  MODEL = 'MODEL',
  ACTION = 'ACTION',
  HANDLER = 'HANDLER',
  HANDLER_ENTRY = 'HANDLER_ENTRY'
}

export class ApplicationFile {
  id: string
  dirName: string
  fileName: string
  type: ApplicationFileType
  language: Language
  builder: Builder<unknown>

  constructor(
    data: Pick<ApplicationFile, 'id' | 'dirName' | 'fileName' | 'type' | 'language' | 'builder'>
  ) {
    Object.assign(this, data)
  }

  getFullPath(): string {
    return join(this.dirName, this.fileName)
  }

  // TODO remove and add per language file
  getBuilder<TBuilder extends Builder<unknown>>(): TBuilder {
    return this.builder as TBuilder
  }

  getExtension(): string {
    return this.fileName.split('.').pop() as string
  }
}

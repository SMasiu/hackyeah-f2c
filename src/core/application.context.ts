import { ApplicationFile } from './application-file'
import { ApplicationResource } from './application-resource'

export class ApplicationContext {
  private files: Record<string, ApplicationFile> = {}
  private resources: Record<string, ApplicationResource> = {}

  addFile(file: ApplicationFile) {
    if (file.id in this.files) {
      throw new Error('File id conflict')
    }

    this.files[file.id] = file
  }

  getFile<TApplication extends ApplicationFile = ApplicationFile>(id: string): TApplication {
    const file = this.files[id]

    if (!file) {
      throw new Error(`File with id: [${id}] not found`)
    }

    return file as TApplication
  }

  getFiles(): ApplicationFile[] {
    return Object.values(this.files)
  }

  addResource(resource: ApplicationResource) {
    if (resource.id in this.resources) {
      throw new Error('Resource id conflict')
    }

    this.resources[resource.id] = resource
  }

  getResource(id: string): ApplicationResource {
    const resource = this.resources[id]

    if (!resource) {
      throw new Error(`Resource with id: [${id}] not found`)
    }

    return resource
  }

  getResources(): ApplicationResource[] {
    return Object.values(this.resources)
  }
}

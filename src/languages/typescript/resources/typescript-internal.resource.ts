import { ApplicationContext } from '../../../core'
import {
  TypeScriptBuilder,
  typeScriptImportBuilderFactory,
  typeScriptReferenceStackBuilderFactory,
  typeScriptTypeDeclarationBuilderFactory,
  TypeScriptTypeDeclarationType
} from '../builders'
import { TypescriptApplicationFile } from '../typescript.file'

export interface TypeScriptInternalResourceDependencies {
  context: ApplicationContext
}

export interface GetTypeFromResourceOptions {
  internalResourceId: string
  currentFileId: string
}

export class TypeScriptInternalResource {
  constructor(private readonly dependencies: TypeScriptInternalResourceDependencies) {}

  getTypeFromResource({ internalResourceId, currentFileId }: GetTypeFromResourceOptions) {
    const resource = this.dependencies.context.getResource(internalResourceId)
    const currentFile = this.dependencies.context.getFile<TypescriptApplicationFile>(currentFileId)
    const resourceFile = this.dependencies.context.getFile(resource.applicationFileId)

    const modulePath = currentFile.getRelativePath(resourceFile)

    const builder = currentFile.getBuilder<TypeScriptBuilder>()
    builder.addImport(
      typeScriptImportBuilderFactory().setModule(modulePath).addObject(resource.name)
    )

    return typeScriptTypeDeclarationBuilderFactory().setValue({
      type: TypeScriptTypeDeclarationType.REFERENCE,
      value: resource.name
    })
  }

  getReferenceStackFromResource({ internalResourceId }: GetTypeFromResourceOptions) {
    const resource = this.dependencies.context.getResource(internalResourceId)

    return typeScriptReferenceStackBuilderFactory().addValue({
      name: resource.name
    })
  }
}

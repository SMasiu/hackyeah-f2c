import { dirname, relative } from 'path'
import { TypeScriptBuilder, typeScriptBuilderFactory } from './builders'
import { ApplicationFile } from '../../core'
import { Language } from '../../models'

export class TypescriptApplicationFile extends ApplicationFile {
  override language: Language.TYPESCRIPT
  override builder: TypeScriptBuilder

  constructor(
    data: Pick<ApplicationFile, 'id' | 'dirName' | 'fileName' | 'type'> & {
      builder?: TypeScriptBuilder
    }
  ) {
    const builder = data.builder || typeScriptBuilderFactory()
    const language = Language.TYPESCRIPT

    super({ ...data, language, builder })

    this.language = language
    this.builder = builder
  }

  getRelativePath(resourceFile: ApplicationFile) {
    const path = `./${relative(dirname(this.getFullPath()), resourceFile.getFullPath())}`

    return path.substring(0, path.length - resourceFile.getExtension().length - 1)
  }
}

import { Builder } from '../../../core'

export enum TypeScriptImportDefaultType {
  ALL = 'ALL',
  DEFAULT = 'DEFAULT'
}

export interface TypeScriptImportDefault {
  type: TypeScriptImportDefaultType
  object: string
}

export interface TypeScriptImportPayload {
  defaultObject?: TypeScriptImportDefault
  objects: string[]
  module: string
}

export class TypeScriptImportBuilder implements Builder<TypeScriptImportPayload> {
  private defaultObject: TypeScriptImportDefault
  private objects: string[] = []
  private module: string

  build(): TypeScriptImportPayload {
    const { defaultObject, objects, module } = this

    return { defaultObject, objects, module }
  }

  setDefaultObject(defaultObject: TypeScriptImportDefault): TypeScriptImportBuilder {
    this.defaultObject = defaultObject

    return this
  }

  setModule(module: string): TypeScriptImportBuilder {
    this.module = module

    return this
  }

  addObject(object: string): TypeScriptImportBuilder {
    this.objects.push(object)

    return this
  }

  addObjects(objects: string[]): TypeScriptImportBuilder {
    this.objects.push(...objects)

    return this
  }
}

export const typeScriptImportBuilderFactory = () => new TypeScriptImportBuilder()

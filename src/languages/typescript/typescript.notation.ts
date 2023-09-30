import { nameToCamelCase, nameToPascalCase } from '../../utils'

export const mapDataTypeNameToTypeScriptName = (name: string) => nameToPascalCase(name)

export const mapVariableReferenceToTypeScriptName = (name: string) => nameToCamelCase(name)

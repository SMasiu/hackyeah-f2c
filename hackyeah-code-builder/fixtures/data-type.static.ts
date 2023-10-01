import {
  DataTypeBoolDto,
  DataTypeCharDto,
  DataTypeContentType,
  DataTypeDto,
  DataTypeNumberDto,
  DataTypeStringDto
} from '../src/models'

export const staticBoolDataType: DataTypeBoolDto = {
  id: 'common.bool',
  name: 'Boolean',
  projectId: null,
  content: {},
  contentType: DataTypeContentType.BOOL
}

export const staticNumberDataType: DataTypeNumberDto = {
  id: 'common.number',
  name: 'Number',
  projectId: null,
  content: {},
  contentType: DataTypeContentType.NUMBER
}

export const staticIntDataType: DataTypeNumberDto = {
  id: 'common.int',
  name: 'Integer',
  projectId: null,
  content: {},
  contentType: DataTypeContentType.NUMBER
}

export const staticDecimalDataType: DataTypeNumberDto = {
  id: 'common.decimal',
  name: 'Decimal',
  content: {},
  projectId: null,
  contentType: DataTypeContentType.NUMBER
}

export const staticCharDataType: DataTypeCharDto = {
  id: 'common.char',
  name: 'Char',
  projectId: null,
  content: {},
  contentType: DataTypeContentType.CHAR
}

export const staticStringDataType: DataTypeStringDto = {
  id: 'common.string',
  name: 'String',
  projectId: null,
  content: {},
  contentType: DataTypeContentType.STRING
}

export const staticDataTypes: DataTypeDto[] = [
  staticBoolDataType,
  staticNumberDataType,
  staticIntDataType,
  staticDecimalDataType,
  staticCharDataType,
  staticStringDataType
]

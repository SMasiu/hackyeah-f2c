export enum DataTypeContentType {
  BOOL = 'BOOL',
  CHAR = 'CHAR',
  COMPLEX = 'COMPLEX',
  ENUM = 'ENUM',
  INTERFACE = 'INTERFACE',
  NUMBER = 'NUMBER',
  NOMINAL = 'NOMINAL',
  STRING = 'STRING'
}

export interface DataTypeBase {
  id: string
  name: string
  projectId: string | null
}

export type DataTypeUnionItem<TContentType, TContent> = DataTypeBase & {
  contentType: TContentType
  content: TContent
}

export type DataTypeBoolContentDto = Record<string, never>
export type DataTypeBoolDto = DataTypeUnionItem<DataTypeContentType.BOOL, DataTypeBoolContentDto>

export type DataTypeCharContentDto = Record<string, never>
export type DataTypeCharDto = DataTypeUnionItem<DataTypeContentType.CHAR, DataTypeCharContentDto>

export type DataTypeComplexContentDto = Record<string, never>
export type DataTypeComplexDto = DataTypeUnionItem<
  DataTypeContentType.COMPLEX,
  DataTypeComplexContentDto
>

export type DataTypeEnumContentDto = Array<{ key: string; value: string }>
export type DataTypeEnumDto = DataTypeUnionItem<DataTypeContentType.ENUM, DataTypeEnumContentDto>

export type DataTypeInterfaceContentDto = Record<string, never>
export type DataTypeInterfaceDto = DataTypeUnionItem<
  DataTypeContentType.INTERFACE,
  DataTypeInterfaceContentDto
>

export type DataTypeNumberContentDto = Record<string, never>
export type DataTypeNumberDto = DataTypeUnionItem<
  DataTypeContentType.NUMBER,
  DataTypeNumberContentDto
>

export interface DataTypeNominalContentDto {
  underlyingDataTypeId: string
}
export type DataTypeNominalDto = DataTypeUnionItem<
  DataTypeContentType.NOMINAL,
  DataTypeNominalContentDto
>

export type DataTypeStringContentDto = Record<string, never>
export type DataTypeStringDto = DataTypeUnionItem<
  DataTypeContentType.STRING,
  DataTypeStringContentDto
>

export type DataTypeDto =
  | DataTypeBoolDto
  | DataTypeCharDto
  | DataTypeComplexDto
  | DataTypeEnumDto
  | DataTypeInterfaceDto
  | DataTypeNumberDto
  | DataTypeNominalDto
  | DataTypeStringDto

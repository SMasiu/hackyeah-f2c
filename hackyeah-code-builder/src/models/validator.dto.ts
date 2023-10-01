import { DataTypeContentType } from './data-type.dto'

export interface ValidatorDto {
  id: string
  name: string
  resolver: string
  allowedDataTypes: DataTypeContentType[]
}

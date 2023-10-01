import { set } from 'lodash'

export interface DataPayload {
  value: object
}

export class DataBuilder {
  protected value: object

  setValue(value: object): this {
    this.value = value

    return this
  }

  setValueNestedKey(key: string, value: unknown) {
    this.setValue(set(this.value, key, value))
  }
}

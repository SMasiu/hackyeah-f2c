export interface ApplicationGenerator {
  generate(): Promise<void>
  build(): Promise<void>
}

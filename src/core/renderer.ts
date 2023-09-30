import { ApplicationFileContent } from './application-file.content'

export interface Renderer<TPayload> {
  render(fileContent: ApplicationFileContent, payload: TPayload): void
}

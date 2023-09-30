export class ApplicationFileContent {
  private content: string[] = []
  private indentation = 0
  private shouldAddSpacingToNextItem = false

  appendRawContent(value: string): void {
    this.content.push(value)

    this.shouldAddSpacingToNextItem = false
  }

  appendItemToContent(value: string): void {
    if (!this.content.length) {
      this.content.push('')
    }

    const spacing = this.shouldAddSpacingToNextItem ? this.calculateItemSpacing() : ''

    this.content[this.content.length - 1] += `${spacing}${value}`

    this.shouldAddSpacingToNextItem = false
  }

  appendItemToContentWithSpacing(value: string): void {
    if (!this.content.length) {
      this.content.push('')
    }
    const spacing = this.calculateItemSpacing()

    const lastContentIndex = this.content.length - 1
    this.content[lastContentIndex] += `${spacing}${value}`

    this.shouldAddSpacingToNextItem = false
  }

  appendEmptyLine(): void {
    this.content.push('')

    this.shouldAddSpacingToNextItem = false
  }

  startNewContent(): void {
    this.content.push(new Array(this.indentation * 2 + 1).join(' '))

    this.shouldAddSpacingToNextItem = false
  }

  calculateItemSpacing() {
    const lastContentIndex = this.content.length - 1
    const content = this.content[lastContentIndex]

    return !content.length || content[content.length - 1] === ' ' ? '' : ' '
  }

  addSpacingToNextItem() {
    this.shouldAddSpacingToNextItem = true
  }

  pushIndentation(): void {
    this.indentation = this.indentation + 1
  }

  popIndentation(): void {
    this.indentation = this.indentation - 1
  }

  render(): string {
    return this.content.join('\n')
  }
}

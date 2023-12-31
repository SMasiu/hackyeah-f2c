const alwaysError = (value) => [2, 'always', value]
const neverError = (value) => [2, 'never', value]

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': alwaysError(['feat', 'fix', 'chore', 'test', 'config', 'docs']),
    'scope-enum': alwaysError([
      'project',
      'fixture',
      'core',
      'builder',
      'generator',
      'model',
      'renderer',
      'ecosystem',
      'store'
    ]),
    'type-case': alwaysError('lower-case'),
    'type-empty': neverError(),
    'scope-case': alwaysError('lower-case'),
    'scope-empty': neverError(),
    'subject-case': alwaysError('lower-case'),
    'subject-empty': neverError(),
    'subject-full-stop': neverError('.')
  }
}

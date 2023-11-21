/* eslint-disable no-undef */

/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: [
    'master'
  ],
  repositoryUrl: 'git@github.com:stevendejongnl/MadeBySteven.git',
  preset: 'conventionalcommits',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        'releaseRules': [
          { 'type': 'feat', 'release': 'minor' }, // A new feature
          { 'type': 'fix', 'release': 'patch' }, // A bug fix
          { 'type': 'docs', 'release': false }, // Documentation only changes
          { 'type': 'style', 'release': false }, // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
          { 'type': 'refactor', 'release': false }, // A code change that neither fixes a bug nor adds a feature
          { 'type': 'perf', 'release': 'patch' }, // A code change that improves performance
          { 'type': 'test', 'release': false }, // Adding missing or correcting existing tests
          { 'type': 'chore', 'release': false }, // Changes to the build process or auxiliary tools and libraries such as documentation generation
        ],
        'parserOpts': {
          'noteKeywords': ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING']
        }
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        'parserOpts': {
          'noteKeywords': ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING']
        },
        'presetConfig': {
          'types': [
            { 'type': 'feat', 'section': '✨ Feature', 'hidden': false },
            { 'type': 'fix', 'section': '🐛 Bugfix', 'hidden': false },
            { 'type': 'perf', 'section': '🚀 Performance', 'hidden': false },
            { 'type': 'docs', 'section': '📖 Documentation', 'hidden': false },
            { 'type': 'style', 'section': '🛠️ Maintenance', 'hidden': false },
            { 'type': 'refactor', 'section': '🏗️ Refactor', 'hidden': false },
            { 'type': 'test', 'section': '🧪 Tests', 'hidden': false },
            { 'type': 'chore', 'section': '🛠️ Maintenance', 'hidden': false },
          ]
        }
      }
    ],
    [
      '@semantic-release/changelog',
      {
        'changelogFile': 'CHANGELOG.md'
      }
    ],
    [
      '@semantic-release/npm',
      {
        'npmPublish': false
      }
    ],
    '@semantic-release/git'
  ],
  ci: true,
  debug: false,
  dryRun: false,
} 

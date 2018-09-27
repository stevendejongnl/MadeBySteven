const gulp = require('gulp');
const shell = require('gulp-shell');
const LINT_IGNORE = require('../config/lint-ignore.json');
const phpcs = './vendor/bin/phpcs';

module.exports = function () {
  return gulp.src(['core/**/*.php', 'views/**/*.php', ...LINT_IGNORE.phpcodesniffer], {read: false})
    .pipe(shell([
      `exec ${phpcs} <%= file.path %>`
    ]))
};

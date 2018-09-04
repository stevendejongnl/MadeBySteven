const gulp = require('gulp');
const eslint = require('gulp-eslint');
const LINT_IGNORE = require('../config/lint-ignore.json');

module.exports = function () {
  return gulp.src(['src/scripts/**/*.js', ...LINT_IGNORE.eslint], { sourcemaps: true })
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format('stylish'))
    // .pipe(eslint.format('./tests/config/eslint-formatter.js'))
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
};

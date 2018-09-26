const gulp = require('gulp');
const phplint = require('gulp-phplint');
const LINT_IGNORE = require('../config/lint-ignore.json');

module.exports = function () {
  return gulp.src(['**/*.php', ...LINT_IGNORE.phplint])
    .pipe(phplint('', { /*opts*/ }))
    .pipe(phplint.reporter((file) => {
      let report = file.phplintReport || {};
      if (report.error) {
        console.error(`${report.message} on line ${report.line} of ${report.file}`);
      }
    }));
};

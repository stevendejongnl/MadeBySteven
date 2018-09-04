const gulp = require('gulp');
const gulpStylelint = require('gulp-stylelint');
const STYLELINTFORMATTER = require('../config/stylelint-formatter');
const LINT_IGNORE = require('../config/lint-ignore.json');

module.exports = function () {
  return gulp
    .src(['src/styles/**/*.{scss,css}', ...LINT_IGNORE.stylelint])
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true},
        // {formatter: STYLELINTFORMATTER}
      ]
    }))
};

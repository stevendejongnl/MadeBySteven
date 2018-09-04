const gulp = require('gulp');
const SOURCEMAPS = require("gulp-sourcemaps");
const BABEL = require("gulp-babel");
const CONCAT = require("gulp-concat");

module.exports = function () {
  return gulp
    .src("src/scripts/**/*.js")
    .pipe(SOURCEMAPS.init())
    .pipe(BABEL())
    .pipe(CONCAT("main.js"))
    .pipe(SOURCEMAPS.write("."))
    .pipe(gulp.dest("dist/scripts"));
};

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');

module.exports = function () {
  return gulp.src("./src/styles/**/*.{scss,css}")
    .pipe(sass())
    .pipe(gulp.dest("./dist/styles"))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(concat('main.min.css'))
    .pipe(browserSync.stream());
};

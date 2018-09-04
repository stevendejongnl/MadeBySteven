const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

module.exports = function () {
  return gulp
    .watch("./src/scripts/**/*.{scss,css}", ['sass'])
    .watch("./").on('change', browserSync.reload);
};

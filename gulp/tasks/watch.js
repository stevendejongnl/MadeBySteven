const gulp = require('gulp');
const browserSync = require('browser-sync').create();

module.exports = function () {
  return gulp
    .watch("./src/scripts/**/*.{scss,css}", ['sass'])
    .watch("./").on('change', browserSync.reload);
};

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

module.exports = function () {
  browserSync.init({
    proxy: "local.madebysteven.nl"
  });

  gulp.watch("./src/styles/**/*.{scss,css}", ['stylelint', 'sass']);
  gulp.watch("./src/scripts/**/*.js", ['eslint', 'babel']);
  gulp.watch("./").on('change', browserSync.reload);
};

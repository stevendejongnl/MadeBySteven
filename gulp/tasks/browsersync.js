const gulp = require('gulp');
const browserSync = require('browser-sync').create();

module.exports = function () {
  browserSync.init({
    proxy: "https://local.madebysteven.nl"
  });

  gulp.watch("./src/styles/**/*.{scss,css}", ['stylelint', 'sass']);
  gulp.watch(["./**/*.php", "!./vendor/**/*.php"], ['phpcodesniffer']);
  gulp.watch("./src/scripts/**/*.js", ['eslint', 'babel']);
  gulp.watch("./").on('change', browserSync.reload);
};

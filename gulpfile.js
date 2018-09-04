const gulp = require('gulp');
const dir = require('require-dir');

const tasks = dir('./gulp/tasks');

for(task in tasks) {
  gulp.task(task, tasks[task])
}

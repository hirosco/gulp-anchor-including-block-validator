'use strict';

var gulp   = require('gulp');
var anchor = require('gulp-anchor-including-block-validator');

gulp.task('default',function(){
  return gulp.src(['sample/*'])
    .pipe(anchor('label'));
});

/**
 * Compiles src/js to public/js
 **/

'use strict';

var paths = require('./config.js').paths;
var gulp = require('gulp');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var onError = require('./on-error.js');

// Paths
var watchPath = paths.src_scripts + '/**/*.js';
var destPath = paths.dest_scripts;

gulp.task('scripts', function() {
  return gulp.src([paths.src_scripts + '/vendors/*.js', paths.src_scripts + '/components/*.js', paths.src_scripts + 'demo.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('demo.js'))
    .pipe(gulp.dest(destPath));
});

gulp.task('scripts:watch', ['scripts'], function() {
  return gulp.watch(watchPath).on('change', function() {
    runSequence('scripts', 'browser-sync-reload');
  });
});

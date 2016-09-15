/**
 * Browser Sync setup and tasks
 **/

'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    proxy: 'localhost:3000', // local node app address
    port: 5000, // use *different* port than above
    notify: true
  });
});

gulp.task('browser-sync-reload', function() {
  browserSync.reload();
});

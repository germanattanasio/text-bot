/**
 * Nodemon edits to server scripts will reload
 **/

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var reload = require('browser-sync').reload;

// initiate nodemon
gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    ext: 'ejs',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function() {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function() {
    setTimeout(function() {
      reload({
        stream: false
      });
    }, 1000);
  });
});

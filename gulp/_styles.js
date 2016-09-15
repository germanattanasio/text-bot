var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    onError = require('./on-error.js');

module.exports = function(watchPath, destPath, gulpInstance) {
  return gulpInstance.src([watchPath])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      errLogToConsole: true,
      includePaths: ['./bower_components']
    }))
    .pipe(autoprefixer())
    .pipe(gulpInstance.dest(destPath));
}
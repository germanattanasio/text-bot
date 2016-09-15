var config = require('../config.js'),
    sass = require('./_styles.js'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    plumber = require('gulp-plumber'),
    onError = require('./on-error.js');

// Paths
var watchPath = config.paths.src.styles + '/**/*.scss',
    destPath = config.paths.dist.root,
    distSrcPath = config.paths.src.dist;

var projectName = config.projectName;

// gulp.task('dist', ['bower:scss', 'bower:css', 'bower:bower-configs', 'bower:icons', 'bower:icon-fonts']);

gulp.task('dist', function() {
  return runSequence('dist:clean', [
    'dist:scss',
    'dist:css',
    'dist:icons',
    'dist:icon-fonts',
    'dist:scripts'
  ]);
});

gulp.task('dist:clean', function() {
  return gulp.src([destPath]).pipe(clean());
});

gulp.task('dist:scss', function() {
  return runSequence(
    'dist:scss-export',
    'dist:scss-change-name',
    'dist:scss-clean',
    'dist:clean-style'
  );
});

gulp.task('dist:scss-export', function() {
  return gulp.src([watchPath])
    .pipe(gulp.dest(destPath));
});

gulp.task('dist:scss-change-name', function() {
  return gulp.src([destPath + '/' + projectName + '.scss'])
    .pipe(rename('_' + projectName + '.scss'))
    .pipe(gulp.dest(destPath));
});

gulp.task('dist:scss-clean', function() {
  return gulp.src([destPath + '/' + projectName + '.scss'])
    .pipe(clean());
});

gulp.task('dist:css', function() {
  return runSequence('dist:css-normal', 'dist:css-min');
});

gulp.task('dist:css-normal', function() {
  return sass(watchPath, destPath, gulp);
});

gulp.task('dist:css-min', function() {
  return gulp.src([destPath + '/' + projectName + '.css'])
    .pipe(rename(projectName + '.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(destPath));
});

gulp.task('dist:clean-style', function() {
  return gulp.src([destPath + '/style.scss', destPath + '/style.css'])
    .pipe(clean());
});

gulp.task('dist:scripts', ['dist:scripts-lib', 'dist:scripts-unminify', 'dist:scripts-minify']);

gulp.task('dist:scripts-lib', function() {
  return gulp.src([config.paths.src.scripts + '/lib/**/*.js'])
    .pipe(gulp.dest(config.paths.dist.scripts));
});

gulp.task('dist:scripts-unminify', function() {
  return gulp.src([config.paths.src.scripts + '/lib/vendors/*.js', config.paths.src.scripts + '/lib/components/*.js', config.paths.src.scripts + '/lib/script.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat(projectName + '.js'))
    .pipe(gulp.dest(config.paths.dist.root));
});

gulp.task('dist:scripts-minify', function() {
  return gulp.src([config.paths.src.scripts + '/lib/vendors/*.js', config.paths.src.scripts + '/lib/components/*.js', config.paths.src.scripts + '/lib/script.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat(projectName + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist.root));
});

gulp.task('dist:icons', function() {
  return gulp.src(config.paths.src.icons + '/**.*')
    .pipe(gulp.dest(destPath + '/icons'));
});

gulp.task('dist:icon-fonts', function() {
  return gulp.src(config.paths.docs.iconFonts + '/**.*')
    .pipe(gulp.dest(destPath + '/icons-fonts'));
});

gulp.task('dist:watch', function() {
  return gulp.watch(watchPath).on('change', function() {
    runSequence('dist', 'browser-sync-reload');
  });
});
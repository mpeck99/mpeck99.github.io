const gulp = require('gulp'),
  watch = require('gulp-watch'),
  // del = require('del'),
  pump = require('pump'),
  // rename = require('gulp-rename'),
  // sourcemaps = require('gulp-sourcemaps'),
  nunjucksRender = require('gulp-nunjucks-render'),
  // sass = require('gulp-sass'),
  // autoprefixer = require('gulp-autoprefixer'),
  // concat = require('gulp-concat'),
  // babel = require('gulp-babel'),
  // uglify = require('gulp-uglify'),
  // replace = require('replace-in-file'),
  // svgmin = require('gulp-svgmin'),
  // runSequence = require('run-sequence'),
  // shell = require('gulp-shell'),
  // jpegmini = require('jpegmini'),
  browserSync = require('browser-sync').create();

// ----------------------------
// Default
// ----------------------------
gulp.task('default', ['serve']);


// Build All
gulp.task('build', ['nunjucks']);


// ----------------------------
// HTML Tasks
// ----------------------------
gulp.task('nunjucks', cb => {
  pump(
    [
      gulp.src(['src/nunjucks/**/*.nunjucks', '!src/nunjucks/templates/**/*.nunjucks']),
      nunjucksRender({
        envOptions: {
          autoescape: false
        },
        path: ['src/nunjucks/templates']
      }),
      gulp.dest('build')
    ],
    cb
  );
});

// ----------------------------
// Browsersync
// ----------------------------
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './build/'
    },
    open: false,
    notify: false
  });

  gulp.watch('src/nunjucks/**/*.nunjucks', );
});
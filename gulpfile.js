const gulp = require('gulp'),
  watch = require('gulp-watch'),
  // del = require('del'),
  pump = require('pump'),
  // rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  nunjucksRender = require('gulp-nunjucks-render'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
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

// ----------------------------
// Build Tasks
// ----------------------------
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

gulp.task('htmlReload', ['nunjucks'], () => {
  return browserSync.reload();
})

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

  gulp.watch('src/nunjucks/**/*.nunjucks', ['htmlReload']);
  gulp.watch(
    ['src/sass/**/*.scss'],
    ['sass']
  );
});

// ----------------------------
// CSS Tasks
// ----------------------------
gulp.task('sass', cb => {
  pump(
    [
      gulp.src('src/sass/styles.scss'),
      sourcemaps.init(),
      sass.sync().on('error', sass.logError),
      autoprefixer({
        browsers: ['last 3 versions', 'ie 10', 'ie 11'],
        cascade: false,
        grid: true
      }),
      sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError),
      sourcemaps.write('./maps'),
      gulp.dest('build/assets/css'),
      browserSync.stream({
        match: '**/*.css'
      })
    ],
    cb
  );
});

gulp.task('sassMove', () => {
  pump([
    gulp.src('build/assets/css/styles.css'),
    gulp.dest('/Volumes/Sitefinity/HealthAdvantage/theme/css')
  ]);
  pump([
    gulp.src('build/assets/css/maps/styles.css.map'),
    gulp.dest('/Volumes/Sitefinity/HealthAdvantage/theme/css/maps')
  ]);
});
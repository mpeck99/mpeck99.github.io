const gulp = require('gulp'),
  watch = require('gulp-watch'),
  // del = require('del'),
  pump = require('pump'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  nunjucksRender = require('gulp-nunjucks-render'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  replace = require('replace-in-file'),
  svgmin = require('gulp-svgmin'),
  runSequence = require('run-sequence'),
  // shell = require('gulp-shell'),
  // jpegmini = require('jpegmini'),
  browserSync = require('browser-sync').create();





// ----------------------------
// Browsersync
// ----------------------------
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './',
      http: true,
    },
    open: false,
    notify: false
  });

  gulp.watch('src/nunjucks/**/*.nunjucks', gulp.series('htmlReload'));
  gulp.watch(
    ['src/sass/**/*.scss'],
    gulp.series('sass')
  );
  gulp.watch('src/svg/**/*.svg', gulp.series('svgReload'));
  gulp.watch(['src/js/**/*.js'], gulp.series('siteJsReload'));
});

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
      gulp.dest('./')
    ],
    cb()
  );
});

gulp.task('htmlReload', gulp.series('nunjucks'), () => {
  return browserSync.reload();
})

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
      gulp.dest('assets/css'),
      browserSync.stream({
        match: '**/*.css'
      })
    ],
    cb
  );
});

gulp.task('bootstrapsass', () => {
  pump([
    gulp.src('node_modules/bootstrap/scss/bootstrap.scss'),
    sourcemaps.init(),
    sass.sync().on('error', sass.logError),
    autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }),
    sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError),
    sourcemaps.write('./maps'),
    gulp.dest('assets/css')
  ]);
});


// ------------------------------------------------
// Image Tasks
// ------------------------------------------------
gulp.task('moveImages', () => {
  return gulp
    .src(['src/images/*.jpg', 'src/images/*.png', 'src/images/*.gif', 'src/images/*.svg'])
    .pipe(gulp.dest('assets/images'));
});

// ----------------------------
// SVG Tasks
// ----------------------------

gulp.task('svgBuild', cb => {
  pump(
    [
      gulp.src('src/svg/src/**/*.svg'),
      svgmin(function getOptions(file) {
        let svgfilename = file.relative;
        let svgclass = '';
        if (svgfilename.includes('logo-')) {
          svgclass = 'logo ' + svgfilename.replace(/.svg/g, '');
        } else if (svgfilename.includes('img-')) {
          svgclass = 'img ' + svgfilename.replace(/.svg/g, '');
        } else {
          svgclass = 'icn ' + svgfilename.replace(/.svg/g, '');
        }
        return {
          plugins: [{
              removeDimensions: true
            },
            {
              cleanupIDs: {
                remove: false
              }
            },
            {
              addClassesToSVGElement: {
                className: svgclass
              }
            }
          ]
        };
      }),
      gulp.dest('src/svg/out/')
    ],
    cb
  );
});

gulp.task('svgConvertId', () => {
  const svgReplaceOptions = {
    files: 'src/nunjucks/templates/svg/**/*.nj',
    from: ['id="Layer_1"'],
    to: ['']
  };
  replace(svgReplaceOptions, error => {
    if (error) {
      return console.error('Error occurred:', error);
    }
  });
});

gulp.task('svgtonj', cb => {
  pump(
    [
      gulp.src('src/svg/out/**/*.svg'),
      rename({
        extname: '.nj'
      }),
      gulp.dest('src/nunjucks/templates/svg/')
    ],
    cb
  );
});

gulp.task('svgReload', () => {
  runSequence('svgtonj', 'svgBuild', 'svgConvertId', function () {
    return browserSync.reload();
  });
});

// ------------------------------------------------
// Javascript Tasks
// ------------------------------------------------
var siteJSFiles = ['src/js/site.js'];
gulp.task('siteJSBuild', cb => {
  pump(
    [
      gulp.src(siteJSFiles),
      sourcemaps.init(),
      concat('site.js'),
      babel({
        presets: ['@babel/env']
      }),
      uglify(),
      rename('site.min.js'),
      sourcemaps.write('./maps'),
      gulp.dest('assets/js/')
    ],
    cb
  );
});
gulp.task('siteJsReload', gulp.series('siteJSBuild'), () => {
  return browserSync.reload();
});
// ----------------------------
// Default
// ----------------------------
gulp.task('default', gulp.series('serve'));
// ----------------------------
// Build Tasks
// ----------------------------
gulp.task('build', gulp.series('nunjucks', 'moveImages', 'sass', 'svgBuild', 'bootstrapsass', 'siteJSBuild'));
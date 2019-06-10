const gulp = require('gulp'),
  watch = require('gulp-watch'),
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
  exec = require('gulp-exec'),
  browserSync = require('browser-sync').create();

// ====---------------====
// Paths
// ====---------------====
const paths = {
  sass: {
    src: ['src/sass/**/*.{scss,sass}'],
    dest: 'build/assets/css'
  },
  njk: {
    src: 'src/nunjucks/**/*.{njk, nj, nunjucks}',
    ignore: '!src/nunjucks/templates/**/*.{njk, nj, nunjucks}',
    tempaltes: 'src/nunjucks/templates',
    dest: 'build/'
  },
  js: {
    site: {
      src: 'src/js/**/*.js',
      dest: 'build/assets/js/'
    },
    vendor: {
      src: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/popper.js/dist/umd/popper.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/maskfy/maskfy.es5.js'
      ],
      dest: 'build/assets/js/'
    }
  },
  images: {
    png: {
      src: 'src/images/**/*.png',
      dest: 'build/assets/images'
    },
    jpg: {
      src: 'src/images/**/*.{jpg, jpeg}',
      dest: 'build/assets/images'
    },
    gif: {
      src: 'src/images/**/*.gif',
      dest: 'build/assets/images'
    },
    svg: {
      src: 'src/images/**/*.svg',
      dest: 'build/assets/images'
    }
  },
  svg: {
    src: {
      in: 'src/svg/src/*.svg',
      intwenty: 'src/svg/src/20x20/*.svg',
      out: 'src/svg/out/**/*.svg',
      njk: 'src/nunjucks/templates/svg/**/*.njk'
    },
    dest: {
      out: 'src/svg/out',
      njk: 'src/nunjucks/templates/svg/'
    }
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'build/assets/fonts'
  }
};

// ====---------------====
// Base Functions
// ====---------------====
function reload(done) {
  browserSync.reload();
  done();
}

// ----------------------------
// HTML Tasks
// ----------------------------
gulp.task('nunjucks', cb => {
  pump(
    [
      gulp.src([paths.njk.src, paths.njk.ignore]),
      nunjucksRender({
        envOptions: {
          autoescape: false
        },
        path: [paths.njk.tempaltes]
      }),
      gulp.dest(paths.njk.dest)
    ],
    cb
  );
});

// ----------------------------
// CSS Tasks
// ----------------------------

// Main SASS
gulp.task('sass', cb => {
  pump(
    [
      gulp.src(paths.sass.src),
      sourcemaps.init(),
      sass.sync().on('error', sass.logError),
      autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
      }),
      sass({
        outputStyle: 'nested'
      }).on('error', sass.logError),
      sourcemaps.write('./maps'),
      gulp.dest(paths.sass.dest),
      browserSync.stream({ match: '**/*.css' })
    ],
    cb
  );
});

// Bootstrap SASS
gulp.task('bootstrapsass', cb => {
  pump(
    [
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
      gulp.dest('build/assets/css')
    ],
    cb
  );
});

// ----------------------------
// JS Tasks
// ----------------------------
// Site Js
gulp.task('siteJs', cb => {
  pump(
    [
      gulp.src(paths.js.site.src),
      sourcemaps.init(),
      concat('site.js'),
      babel({
        presets: ['@babel/env']
      }),
      uglify(),
      rename('site.min.js'),
      sourcemaps.write('./maps'),
      gulp.dest(paths.js.site.dest)
    ],
    cb
  );
});

// Vendor JS
gulp.task('vendorJs', cb => {
  pump(
    [
      gulp.src(paths.js.vendor.src),
      concat('vendor.js'),
      sourcemaps.init(),
      uglify(),
      rename('vendor.min.js'),
      sourcemaps.write('./maps'),
      gulp.dest(paths.js.vendor.dest)
    ],
    cb
  );
});

// Vendor JS
gulp.task('styleGuideJs', cb => {
  pump(
    [
      gulp.src('src/style-guide/js/prism.js'),
      concat('style-guide.js'),
      sourcemaps.init(),
      uglify(),
      rename('style-guide.min.js'),
      sourcemaps.write('./maps'),
      gulp.dest('build/assets/js')
    ],
    cb
  );
});

// ----------------------------
// Image Tasks
// ----------------------------
// PNGs ----------------------
gulp.task('imagesCreateFolder', cb => {
  pump(
    [gulp.src('*.*', { read: false }), gulp.dest('build/assets/images')],
    cb
  );
});
gulp.task(
  'imagesPng',
  gulp.series('imagesCreateFolder', cb => {
    pump(
      [
        gulp.src(paths.images.png.src),
        exec([
          'pngquant --quality=60-80 --output <%= process.cwd() %>\\build\\assets\\images\\<%= file.relative %> <%= file.path %> --force'
        ])
      ],
      cb
    );
  })
);

// JPGs ----------------------
gulp.task(
  'imagesJpg',
  gulp.series('imagesCreateFolder', cb => {
    pump(
      [
        gulp.src(paths.images.jpg.src),
        exec(
          'jpegtran -copy none -optimize -progressive -outfile <%= process.cwd() %>\\build\\assets\\images\\<%= file.relative %> <%= process.cwd() %>\\src\\images\\<%= file.relative %>'
        )
      ],
      cb
    );
  })
);

// Gifs ----------------------
gulp.task('imagesGif', cb => {
  pump([gulp.src(paths.images.gif.src), gulp.dest(paths.images.gif.dest)], cb);
});

// SVGs ----------------------
gulp.task('imagesSvg', cb => {
  pump(
    [
      gulp.src(paths.images.svg.src),
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
          plugins: [
            {
              removeDimensions: true
            },
            {
              cleanupIDs: {
                remove: true
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
      gulp.dest(paths.images.svg.dest)
    ],
    cb
  );
});

// ----------------------------
// SVG Tasks
// ----------------------------
gulp.task('svgSvgmin', cb => {
  pump(
    [
      gulp.src(paths.svg.src.in),
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
          plugins: [
            {
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
      gulp.dest(paths.svg.dest.out)
    ],
    cb
  );
});

gulp.task('svgSvgminTwenty', cb => {
  pump(
    [
      gulp.src(paths.svg.src.intwenty),
      svgmin(function getOptions(file) {
        let svgfilename = file.relative;
        let svgclass = '';
        if (svgfilename.includes('logo-')) {
          svgclass = 'logo icn-2020 ' + svgfilename.replace(/.svg/g, '');
        } else if (svgfilename.includes('img-')) {
          svgclass = 'img icn-2020 ' + svgfilename.replace(/.svg/g, '');
        } else {
          svgclass = 'icn icn-2020 ' + svgfilename.replace(/.svg/g, '');
        }
        return {
          plugins: [
            {
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
      gulp.dest(paths.svg.dest.out)
    ],
    cb
  );
});

gulp.task('svgMoveNjk', cb => {
  pump(
    [
      gulp.src(paths.svg.src.out),
      rename({
        extname: '.njk'
      }),
      gulp.dest(paths.svg.dest.njk)
    ],
    cb
  );
});

gulp.task('svgConvertId', done => {
  const svgReplaceOptions = {
    files: paths.svg.src.njk,
    from: ['id="Layer_1"'],
    to: ['']
  };
  replace(svgReplaceOptions, error => {
    if (error) {
      return console.error('Error occurred:', error);
    }
  });
  done();
});

gulp.task(
  'svgBuild',
  gulp.series(
    ['svgSvgmin', 'svgSvgminTwenty', 'svgMoveNjk', 'svgConvertId'],
    done => {
      done();
    }
  )
);

// ====---------------====
// Move Fonts
// ====---------------====
gulp.task('fontsMove', cb => {
  pump([gulp.src(paths.fonts.src), gulp.dest(paths.fonts.dest)], cb);
});

// ====---------------====
// Build All
// ====---------------====
gulp.task(
  'build',
  gulp.series(
    [
      'nunjucks',
      'sass',
      'siteJs',
      'imagesPng',
      'imagesJpg',
      'imagesGif',
      'svgBuild',
      'fontsMove'
    ],
    done => {
      done();
    }
  )
);

// ----------------------------
// Browsersync
// ----------------------------
gulp.task('serve', done => {
  browserSync.init({
    server: {
      baseDir: './build/'
    },
    open: false,
    notify: false
  });

  gulp.watch(paths.njk.src, gulp.series('nunjucks', reload));
  gulp.watch(paths.sass.src, gulp.series('sass'));
  gulp.watch(paths.js.site.src, gulp.series('siteJs', reload));
  gulp.watch(paths.images.png.src, gulp.series('imagesPng', reload));
  gulp.watch(paths.images.jpg.src, gulp.series('imagesJpg', reload));
  gulp.watch(paths.images.gif.src, gulp.series('imagesGif', reload));
  gulp.watch(paths.svg.src.in, gulp.series('svgBuild', reload));

  done();
});

// ----------------------------
// Default
// ----------------------------
gulp.task(
  'default',
  gulp.series('serve', done => {
    done();
  })
);

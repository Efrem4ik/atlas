let gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename');
browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-cssmin'),
  pug = require('gulp-pug');

gulp.task('sass', function () {
  return gulp.src('docs/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('pug', function () {
  return gulp.src('docs/pug/index.pug', )
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('docs/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('script', function () {
  return gulp.src([
      'node_modules/swiper/js/swiper.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
      'node_modules/wow.js/dist/wow.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'))
});
gulp.task('script-js', function () {
  return gulp.src(['docs/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'))
});


gulp.task('style', function () {
  return gulp.src([
      'node_modules/normalize.css/normalize.css',
      'node_modules/swiper/css/swiper.css',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
      'node_modules/animate.css/animate.css',
    ])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('docs/css'))
});

gulp.task('html', function () {
  return gulp.src('docs/*.html')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function () {
  return gulp.src('docs/js/*.js')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "docs/"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('docs/scss/**/*.scss', gulp.parallel('sass'))
  gulp.watch('docs/**/*.html', gulp.parallel('html'))
  gulp.watch('docs/js/*.js', gulp.parallel('js'))
  gulp.watch('docs/pug/**/*.pug', gulp.parallel('pug'))
});

gulp.task('start', gulp.parallel('sass', 'watch', 'browser-sync', 'script', 'script-js', 'style', 'pug'))
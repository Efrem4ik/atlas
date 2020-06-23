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
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('pug', function(){
  return gulp.src('app/pug/index.pug',)
      .pipe(pug({
           pretty: true
       }))
      .pipe(gulp.dest('app/'))
      .pipe(browserSync.reload({stream: true}))
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
    .pipe(gulp.dest('app/js'))
});
gulp.task('script-js', function () {
  return gulp.src(['app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
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
    .pipe(gulp.dest('app/css'))
});

gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function () {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
  gulp.watch('app/**/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('js'))
  gulp.watch('app/pug/**/*.pug', gulp.parallel('pug'))
});

gulp.task('start', gulp.parallel('sass', 'watch', 'browser-sync', 'script', 'script-js', 'style', 'pug'))
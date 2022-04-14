import gulp from 'gulp';
import browser from 'browser-sync';
import del from 'del';
import rename from 'gulp-rename';
import nunjucks from 'gulp-nunjucks-render'
import htmlmin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import svgo from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import svgstore from 'gulp-svgstore';

//HTML

export const html = () => {
  return gulp.src('source/templates/pages/*.njk')
    .pipe(nunjucks({
      path: ['source/templates']
    }))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('source/'))
}

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Spryte

const sprite = () => {
  return gulp.src('source/img/sprite/**/*.svg')
    .pipe(svgo())
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgstore({
      inlineSvg: false
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('source/img'));
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
    browser: "firefox"
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  html, styles, server, watcher
);

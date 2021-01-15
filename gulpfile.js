const gulp = require('gulp'); 
//Installing Gulp
// npm install -g gulp-cli
// npm install --save-dev gulp

const jshint = require('gulp-jshint');
// npm install --save-dev jshint gulp-jshint                          

const babel = require('gulp-babel');
//npm install --save-dev gulp-babel

const uglify = require('gulp-uglify');
//npm install --save-dev gulp-uglify

const runSequence = require('run-sequence');
//npm install --save-dev run-sequence

const browserSync = require('browser-sync').create();
//npm install --save-dev browser-sync

//Processing our HTML 
gulp.task('processHTML', () => {
    gulp.src('*.html')
      .pipe(gulp.dest('dist'));
}); //command line - gulp processHTML

//Creating our gulpfile
gulp.task('processJS', () => {
    gulp.src('*.js')
      .pipe(gulp.dest('dist'));
}); // command line - gulp processJS

//Processing our JavaScript
gulp.task('processJS', () => {
    gulp.src('scripts.js')
      .pipe(jshint({
        esversion: 6
      }))
      .pipe(jshint.reporter('default'))
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});

gulp.task('babelPolyfill', () => {
    gulp.src('node_modules/babel-polyfill/browser.js')
        .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});

//run
//gulp processHTML
//gulp processJS
//gulp babelPolyfill

//Finalizing our build script
gulp.task('default', (callback) => {
    runSequence(['processHTML', 'processJS', 'babelPolyfill'], callback);
});

//gulp

//Watching our files
gulp.task('watch', () => {
    gulp.watch('*.js', ['processJS']);
    gulp.watch('*.html', ['processHTML']);
});

gulp.task('default', (callback) => {
    runSequence(['processHTML', 'processJS', 'babelPolyfill'], 'watch', callback);
});

//Live reload
gulp.task('browserSync', () => {
    browserSync.init({
      server: './dist',
      port: 8080,
      ui: {
        port: 8081
      }
    });
});

gulp.task('watch', ['browserSync'], () => {
    gulp.watch('*.js', ['processJS']);
    gulp.watch('*.html', ['processHTML']);
  
    gulp.watch('dist/*.js', browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
});
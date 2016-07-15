var gulp       = require('gulp');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

var satellites = ['ganymede', 'io', 'europa']; //['ganymede', 'io', 'europa', 'callisto'];

gulp.task('styles', function () {
  return gulp
    .src([
        './ganymede/styles/ganymede.scss',
        './io/styles/io.scss',
        './europa/styles/europa.scss'
    ])
    .pipe(sass({
            includePaths: [
                'node_modules/foundation-sites/scss',
                'node_modules/normalize.scss',
                'core/styles'
            ]
        }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

Array.prototype.forEach.call(satellites, function(satellite) {
    gulp.task(satellite, function() {
        return browserify('./' + satellite + '/index.jsx')
            .transform(babelify, {presets: ['es2015', 'react']})
            .bundle()
            .pipe(source('index.jsx'))
            .pipe(buffer())
            .pipe(rename(satellite + '.min.js'))
            //.pipe(uglify())
            .pipe(gulp.dest('./public/js/'));
    });
})

gulp.task('scripts', satellites);
gulp.task('default', ['scripts', 'styles']);
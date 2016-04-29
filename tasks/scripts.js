var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence');

module.exports = function(buildOptions) {

    gulp.task('jshint', function() {
        return (
            gulp
                .src([
                    'source/**/*.js',
                    'tasks/*.js',
                    'gulpfile.js'
                ])
                .pipe(jshint())
                .pipe(jshint.reporter())
        );
    });

    gulp.task('scripts', function() {
        return (
            gulp
                .src([
                    'bower_components/angular/angular.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/semantic-ui/dist/semantic.js',
                    'source/js/*.js'
                ])
                .pipe(concat('app.js'))
                .pipe(buildOptions.release ? uglify() : gutil.noop())
                .pipe(gulp.dest('build/assets/'))
                .pipe(gulp.dest('www/assets/ver2/'))
        );
    });

    return function(callback) {
        runSequence('jshint', 'scripts', callback);
    };
};

var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    data = require('gulp-data'),
    runSequence = require('run-sequence'),
    path = require('path'),
    fs = require('fs'),
    templateCache = require('gulp-angular-templatecache');

module.exports = function(buildOptions) {
    var base = 'source/partials/',
        blocks = [],
        blocksFolder = fs.readdirSync(base);

    blocksFolder.forEach(function(item) {
        var that = path.join(base, item);

        if (fs.statSync(that).isDirectory()) {
            blocks.push(that);
        }
    });


    gulp.task('templates', function() {
        var options = {
                ignorePartials: true,
                batch : blocks
            };

        return (
            gulp
                .src(['source/templates/*.html'])
                .pipe(handlebars(data, options))
                .pipe(gulp.dest('build/'))
        );
    });

    return function(callback) {
        runSequence('templates', callback);
    };
};

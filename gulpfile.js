'use strict';

var babel = require('gulp-babel'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    umd = require('gulp-umd'),
    util = require('gulp-util');

function onError() {
    notify.onError({ title: 'Compile Error', message: '<%= error.message %>' }).apply(this, arguments);
    util.beep();
};

gulp.task('default', () => {
    let myProduction = process.env.NODE_ENV === 'production';

    let mySource = 'src/scrollto.js',
        myDestination = 'dist';

    let myUmdOptions = {
        templateName: 'returnExports',
        exports: (file) => null,
    };

    let myBabelOptions = {
        presets: ['es2015'],
    };

    return gulp.src(mySource)
        .pipe(babel(myBabelOptions))
        .pipe(umd(myUmdOptions)).on('error', onError.bind(this))
        .pipe(gulpif(myProduction, uglify())).on('error', onError.bind(this))
        .pipe(gulp.dest(myDestination));
});

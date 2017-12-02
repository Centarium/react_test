var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserify   = require('gulp-browserify');
var babel        = require('gulp-babel');
var browserSync  = require('browser-sync');
var eslint       = require('gulp-eslint');
var notify       = require('gulp-notify');
var uglify       = require('gulp-uglify');
var reload       = browserSync.reload;
var sourcemaps   = require('gulp-sourcemaps');
var concat      = require('gulp-concat');

var jsFiles = {
    "js" : './js/*.js',
    "jsx" : './jsx/*.jsx',
    "components" : './jsx/Components/*.jsx',
    "logo" : './js/Logo.js',
    "build" : './js/build/'
};

var buildPaths = {
    "js" : './js',
    "jsx" : './jsx',
    "components" : './js/build/'
}

gulp.task('jsx_convert', function () {
    return gulp.src(jsFiles.jsx)
        .pipe(babel())
        .pipe( gulp.dest(buildPaths.js) )
});

gulp.task('scripts',['jsx_convert'], function () {
    return gulp.src(jsFiles.logo)
        .pipe( browserify({insertGlobals : true}) )
        .pipe( gulp.dest(jsFiles.build) )
});

gulp.task('concat',function () {
    return gulp.src(jsFiles.components)
        .pipe(concat('build.jsx'))
        .pipe( gulp.dest(buildPaths.components) )
});

gulp.task('components',['concat'],function () {
    return gulp.src('./js/build/build.jsx')
        .pipe(babel())
        .pipe( browserify({insertGlobals : true}) )
        .pipe( gulp.dest(buildPaths.components) )
});

gulp.task('module_components',[],function () {
    return gulp.src(jsFiles.jsx)
        .pipe(babel())
        .pipe( browserify({insertGlobals : true}) )
        .pipe( gulp.dest(buildPaths.js) )
});

gulp.task('watch', function () {
    /*gulp.watch(jsFiles.jsx, ['scripts']).on('change', function (e) {
        console.log('Jsx converted');
    })*/
    gulp.watch(jsFiles.components, ['components']).on('change', function (e) {
        console.log('Jsx converted');
    })
    gulp.watch(jsFiles.jsx, ['module_components']).on('change', function (e) {
        console.log('Jsx module converted');
    })
} );




//browserify - модульность
//babel - convert jsx













































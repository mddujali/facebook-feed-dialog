const gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require ('gulp-sass'),
    notify = require('gulp-notify'),
    filter = require('gulp-filter'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    browsersync = require('browser-sync').create();

const config = {
    dir: {
        npm: './node_modules',
        dist: './dist',
        src: './src'
    }
};

// Remove the dist folder
gulp.task('clean', function () {
    return gulp.src(config.dir.dist)
        .pipe(clean());
});

// Compile style files to app.css
gulp.task('scss', function () {
    return gulp.src(config.dir.src + '/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [
                config.dir.src + '/scss',
                config.dir.npm + '/bootstrap/scss',
                config.dir.npm + '/font-awesome/scss'
            ]
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dir.dist + '/css'))
        .pipe(notify());
});

// Compile script files to app.js
gulp.task('js', function () {
    return gulp.src([
            config.dir.npm + '/jquery/dist/jquery.min.js',
            config.dir.npm + '/bootstrap/dist/js/bootstrap.min.js',
            config.dir.src + '/js/components/**/*.js'
        ])
        .pipe(filter('**/*.js'))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dir.dist + '/js'))
        .pipe(notify());
});

// Copy images files
gulp.task('images', function () {
    return gulp.src(config.dir.src + '/images/**/*')
        .pipe(gulp.dest(config.dir.dist + '/images'))
        .pipe(notify());
});

// Copy fa-fonts files
gulp.task('fa-fonts', function () {
    return gulp.src(config.dir.npm + '/font-awesome/fonts/**/*')
        .pipe(gulp.dest(config.dir.dist + '/fonts'))
        .pipe(notify());
});

// Copy fa-fonts files
gulp.task('fonts', ['fa-fonts'], function () {
    return gulp.src(config.dir.src + '/fonts/**/*')
        .pipe(gulp.dest(config.dir.dist + '/fonts'))
        .pipe(notify());
});

// Copy html files
gulp.task('pages', function () {
    return gulp.src(config.dir.src + '/pages/**/*.html')
        .pipe(gulp.dest(config.dir.dist))
        .pipe(notify());
});

// Watch files
gulp.task('watch', function () {
    gulp.watch(config.dir.src + '/scss/**/*.scss', ['scss']).on('change', browsersync.reload);
    gulp.watch(config.dir.src + '/js/**/*.js', ['js']).on('change', browsersync.reload);
    gulp.watch(config.dir.src + '/images/**/*', ['js']).on('change', browsersync.reload);
    gulp.watch(config.dir.src + '/fonts/**/*', ['js']).on('change', browsersync.reload);
    gulp.watch(config.dir.src + '/pages/**/*.html', ['pages']).on('change', browsersync.reload);
});

// Serve dist directory
gulp.task('browser-sync', ['scss', 'js', 'images', 'fonts', 'pages', 'watch'], function () {
    browsersync.init({
        server: {
            baseDir: config.dir.dist
        }
    });
});

// Run gulp tasks
gulp.task('default', ['clean'], function () {
    gulp.start('browser-sync');
});
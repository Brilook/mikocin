const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


function css_style(done) {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())

        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream());


    done();
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000

    });
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}

function watchSass() {
    gulp.watch("./src/scss/**/*", css_style)
}

function watchFiles() {
    gulp.watch("./src/scss/**/*", css_style)
    gulp.watch("./**/*.html", browserReload)
    gulp.watch("./**/*.js", browserReload)
}



// gulp.task(css_style);
gulp.task('default', gulp.parallel(watchFiles, sync));
gulp.task(sync);
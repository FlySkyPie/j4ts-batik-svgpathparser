const gulp = require('gulp');
const concat = require('gulp-concat');
const ts = require('gulp-typescript');
const rename = require('gulp-rename');

gulp.task('ts', function () {
    return gulp.src('target/ts/bundle.ts')
        .pipe(ts({
            noImplicitAny: false,
            declaration: true,
            outFile: 'bundle.js'
        }))
        .pipe(gulp.dest('target/ts-2'));
});

gulp.task('inject-global', function () {
    return gulp.src(['target/ts-2/bundle.js', 'src/exporter.js'])
        .pipe(concat("j4ts-batik-svgpathparser.js"))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-declaration', function () {
    return gulp.src('target/ts-2/bundle.d.ts')
        .pipe(rename('j4ts-batik-svgpathparser.d.ts'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('ts', 'inject-global', 'copy-declaration'));

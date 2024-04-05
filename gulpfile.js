const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const obfuscate = require("gulp-obfuscate");
const imagemin = require("gulp-imagemin");

function compilaSass () {
    return gulp.src("./source/styles/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./build/styles"));
}

function comprimeJavascript () {
    return gulp.src("./source/scripts/*.js")
    .pipe(uglify())
    .pipe(obfuscate())
        .pipe(gulp.dest("./build/scripts"));
}

function comprimeImagens () {
    return gulp.src("./source/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./build/images"));
}

exports.default = function () {
    gulp.watch("./source/styles/*.scss", {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch("./source/scripts/*.js", {ignoreInitial: false}, gulp.series(comprimeJavascript));
    gulp.watch("./source/images/*", {ignoreInitial: false}, gulp.series(comprimeImagens));
}
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const cache = require("gulp-cached");
const eslint = require("gulp-eslint");

const SOURCES = ["src/*.js", "src/**/*.js"];
const DEST_DIR = "src-gen";

gulp.task("babelify", () => {
    gulp.src(SOURCES)
    // Use plumber to handle errors without terminating the pipe-chain
    .pipe(plumber())
    // Use gulp-cache to avoid re-transpiling files with no changes
    .pipe(cache("babelify"))
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(gulp.dest(DEST_DIR));
});

gulp.task("lint", () => {
    return gulp.src(SOURCES)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("watch", () => {
    gulp.watch(SOURCES, ["babelify"]);
});

gulp.task("default", ["babelify", "watch", "lint"]);

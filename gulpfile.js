const gulp = require("gulp");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const cache = require("gulp-cached");
const eslint = require("gulp-eslint");

const jsSources = ["src/*.js", "src/**/*.js"];

gulp.task("babelify", () => {
    gulp.src(jsSources)
    // Use plumber to handle errors without terminating the pipe-chain
    .pipe(plumber())
    // Use gulp-cache to avoid re-transpiling files with no changes
    .pipe(cache("babelify"))
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(gulp.dest("es5-src"));
});

gulp.task("lint", () => {
    return gulp.src(jsSources)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError);
});

gulp.task("watch", () => {
    gulp.watch(jsSources, ["babelify"]);
});

gulp.task("default", ["lint", "watch"]);

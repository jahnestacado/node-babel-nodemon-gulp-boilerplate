const gulp = require("gulp");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const cache = require("gulp-cached");

gulp.task("babelify", () => {
    gulp.src(["src/*.js", "src/**/*.js"])
    // Use plumber to handle errors without terminating the pipe-chain
    .pipe(plumber())
    // Use gulp-cache to avoid re-transpiling files with no changes
    .pipe(cache("babelify"))
    .pipe(babel({
        presets: ["es2015"]
    }))
    .pipe(gulp.dest("es5-src"));
});

gulp.task("watch", () => {
    gulp.watch(["src/*.js", "src/**/*.js"], ["babelify"])
});

gulp.task("default", ["watch"]);

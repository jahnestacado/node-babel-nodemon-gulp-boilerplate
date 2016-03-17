const gulp = require("gulp");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const cache = require("gulp-cached");
const eslint = require("gulp-eslint");
const nodemon = require("gulp-nodemon");

const SOURCES = ["src/*.js", "src/**/*.js"];
const DEST_DIR = "src-gen";
const MAIN = `${DEST_DIR}/app.js`;

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

gulp.task("nodemon", () => {
    nodemon({
        script: MAIN,
        args:process.argv.splice(3, process.argv.length)
    });
});

gulp.task("default", ["babelify", "lint"]);
gulp.task("dev-start", ["babelify", "lint", "watch", "nodemon"]);

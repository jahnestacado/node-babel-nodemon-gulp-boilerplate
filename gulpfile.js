var gulp = require("gulp");
var plumber = require("gulp-plumber");
var babel = require("gulp-babel");
var cache = require("gulp-cached");
var eslint = require("gulp-eslint");
var nodemon = require("gulp-nodemon");
var path = require("path");

var SOURCES = ["src/**/*.js"];
var DEST_DIR = "src-gen";
var MAIN = path.join(DEST_DIR, "app.js");

gulp.task("babelify", function(){
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

gulp.task("lint", function(){
    gulp.src(SOURCES)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("watch", function(){
    gulp.watch(SOURCES, ["babelify"]);
});

gulp.task("nodemon", function(){
    nodemon({
        script: MAIN,
        args: process.argv.splice(3, process.argv.length)
    });
});

gulp.task("default", ["babelify", "lint"]);
gulp.task("dev", ["babelify", "lint", "watch", "nodemon"]);

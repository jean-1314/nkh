"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var minify = require("gulp-csso");
var concat = require("gulp-concat");

let postplugins = [
		autoprefixer({
			browsers: ["last 3 versions"],
      grid: true
      })
		];

	gulp.task("styles", function() {
		gulp.src("./source/sass/style.scss")
			.pipe(plumber())
			.pipe(sass())
			.pipe(postcss(postplugins))
			.pipe(gulp.dest("./build/css/"))
			.pipe(browserSync.reload({stream: true}));
	});

  gulp.task("scripts", function() {
  return gulp.src(["source/**/*.js"])
    .pipe(concat("script.js"))
    .pipe(gulp.dest("./build/js"));
});

  gulp.task("pages", function() {
		return gulp.src("./source/pages/*.pug")
			.pipe(pug({pretty: true}))
			.pipe(gulp.dest("./build"))
			.pipe(browserSync.reload({stream: true}));
	});

	gulp.task("browser-sync", function() {
		browserSync({
			server: {
				baseDir: "build"
			},
				open: true,
				notify: false
		})
	});

	gulp.task("watch", ["browser-sync"], function() {

		gulp.watch(["./source/sass/style.scss", "./source/**/*.scss"], ["styles"]);
		gulp.watch("./source/**/*.pug", ["pages"]);
    gulp.watch("./source/**/*.js", ["scripts"]);
	});

  gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/*.html"
  ], {
    base: "source/"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

	gulp.task("build", ["pages","styles", "watch"]);

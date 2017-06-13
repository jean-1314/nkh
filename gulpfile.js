var gulp = require("gulp");

var pug = require("gulp-pug");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

var server = require("browser-sync").create();

var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var compress = require("gulp-minify");
var del = require("del");
var imagemin = require("gulp-imagemin");

var run = require("run-sequence");

gulp.task("style", function() {

  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))

    return gulp.src("source/*.pug")
      .pipe(pug())
      .pipe(gulp.dest("build"));
});

gulp.task("html:copy", function(){
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});

gulp.task("serve", function() {
  server.init({
    server: "build/"
  });

  gulp.watch("source/sass/**/*.scss", ["style"]);
  gulp.watch("source/*.pug", ["html:update"]);
  gulp.watch("build/*.html", ["html:update"]);
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
})

gulp.task("compress", function() {
  gulp.src("build/js/*.js")
    .pipe(minify({
        ext:{
            min:".min.js"
        },
    }))
    .pipe(gulp.dest("build/js"))
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source/."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(fn) {
  run("clean", "copy", "style", "images", "compress", fn);
})

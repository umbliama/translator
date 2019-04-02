const gulp = require("gulp");
const sass = require("gulp-sass");
const browsersync = require("browser-sync").create();
const fs = require("fs");
const clean = require("gulp-clean");

function createDefaultFiles() {
  //Change for using another directories
  return new Promise((resolve, reject) => {
    paths = {
      js: "./app/js/main.js",
      scss: "./app/scss/main.scss",
      html: "./app/index.html"
    };
    fs.writeFile(paths.js, "//First js script", err => {
      if (err) console.log(err);
    });
    fs.writeFile(paths.scss, "//First scss style", err => {
      if (err) console.log(err);
    });
    fs.writeFile(paths.html, "//First html file", err => {
      if (err) console.log(err);
    });
    resolve();
  }).catch(() => {
    reject();
  });
}

//Delete full project ('./app')
function cleanProject() {
  return gulp.src("./app").pipe(clean());
}

function createFolders() {
  return gulp
    .src("*.*", { read: false })
    .pipe(gulp.dest("./app/css"))
    .pipe(gulp.dest("./app/js/"))
    .pipe(gulp.dest("./app/scss/"))
    .pipe(gulp.dest("./app/"))
    .pipe(gulp.dest("./app/images"));
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./app/"
    },
    notify: false,
    port: 3000
  });
}

function scss() {
  return gulp
    .src("./app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./app/css/"));
}

function run() {
  gulp.watch("./app/scss/*.scss", scss).on("change", browsersync.reload);
  gulp.watch("./app/*.html").on("change", browsersync.reload);
  gulp.watch("./app/js/*.js").on("change", browsersync.reload);
  browsersync.reload();
}

function buildjs() {
  return gulp.src("./app/js/**/*.js").pipe(gulp.dest("./build/js"));
}
function buildcss() {
  return gulp.src("./app/css/**/*.css").pipe(gulp.dest("./build/css"));
}
function buildimages() {
  return gulp.src("./app/images/**/*.{gif,png,jpg}");
}
function buildhtml() {
  return gulp.src("./app/**/*.html").pipe(gulp.dest("./build"));
}

const watch = gulp.parallel(run, browserSync);
const createProject = gulp.series(createFolders, createDefaultFiles);
const build = gulp.parallel(buildjs, buildcss, buildimages, buildhtml);

//Exports
exports.buildjs = buildjs;
exports.buildcss = buildcss;
exports.buildimages = buildimages;
exports.buildhtml = buildhtml;
exports.createFolders = createFolders;
exports.cleanProject = cleanProject;
exports.createDefaultFiles = createDefaultFiles;
exports.watch = watch;
exports.browserSync = browserSync;
exports.scss = scss;
exports.run = run;
exports.createProject = createProject;
exports.build = build;

var sass = require("gulp-sass")
var merge = require("merge-stream")

module.exports = (gulp, callback) => {
  const scssCoreTask = function() {
    return gulp
      .src(config.source.sass + "/core/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(config.destination.css + "/core/"))
  }

  const scssMainTask = function() {
    return gulp
      .src(
        [
          "bootstrap.scss",
          "bootstrap-extended.scss",
          "material.scss",
          "material-extended.scss",
          "colors.scss",
          "material-colors.scss",
          "components.scss"
        ],
        { cwd: config.source.sass }
      )
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(config.destination.css))
  }

  const scssPagesTask = function() {
    return gulp
      .src(config.source.sass + "/pages/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(config.destination.css + "/pages/"))
  }

  const scssPluginTask = function() {
    return gulp
      .src(config.source.sass + "/plugins/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(config.destination.css + "/plugins/"))
  }

  const scssStyleTask = function() {
    return gulp
      .src(config.assets + "/scss/style.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(config.assets + "/css/"))
  }

  const scssThemesTask = function() {
    return gulp
      .src(config.source.sass + "/themes/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(config.destination.css + "/themes/"))
  }

  const scssRtlTask = function() {
    var custom = gulp
      .src(config.source.sass + "/custom-rtl.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(config.destination.css_rtl))

    var style = gulp
      .src(config.assets + "/scss/style-rtl.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(config.assets + "/css/"))

    return merge(custom, style)
  }

  const scssWatchTask = function() {
    return gulp.watch(
      config.source.sass + "/**/*.scss",
      gulp.parallel(
        scssCoreTask,
        scssMainTask,
        scssPagesTask,
        scssPluginTask,
        scssStyleTask,
        scssThemesTask
      )
    )
  }

  // ---------------------------------------------------------------------------
  // Exports

  return {
    core: scssCoreTask,
    main: scssMainTask,
    pages: scssPagesTask,
    plugins: scssPluginTask,
    style: scssStyleTask,
    themes: scssThemesTask,
    rtl: scssRtlTask,
    watch: scssWatchTask
  }
}

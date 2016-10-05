
var gulp = require('gulp-param')(require('gulp'), process.argv);
var runSequence = require('run-sequence');
var del = require('del');
var rename = require('gulp-rename');
var obt = require('origami-build-tools');

var buildFolder = './wp-content/themes/fthelp';
var themeFolder = './wp-content/themes/';
var environment = 'development';

var paths = {
  scss: ['./src/scss/main.scss'],
  js : ['./src/js/main.js'],
  watch: ['./src/scss/**/*.scss', './src/js/**/*.js', './src/templates/**/*.php', './src/images/**/*.*']
}

function setBuildFolder(theme) {
  console.log('theme: ', theme);
  if (theme && buildFolder.indexOf(theme)===-1) {
    buildFolder = themeFolder += theme;
  }
}

function setEnvironment(env) {
  environment = (env === 'prod')? 'production' : 'development';
}

gulp.task('build', function(theme, env, callback) {
  
  setEnvironment(env);
  setBuildFolder(theme + '-' + environment);
  runSequence('clean-build', 'obt', 'copy-assets', callback);
});

gulp.task('watch', function (theme) {
  gulp.watch(paths.watch, ['build']);
});

gulp.task('clean-build', function(callback){
  return del(buildFolder, callback);
});

gulp.task('obt', function(callback){
  obt.build.sass(gulp, {sass: paths.scss, buildFolder: buildFolder, buildCss: 'style.css', env: environment});
  obt.build.js(gulp, {js: paths.js, buildFolder: buildFolder + '/js', env: environment});
  callback();
});

gulp.task('copy-assets', function (callback) {
  gulp.src('./src/templates/**/*.*').pipe(gulp.dest(buildFolder));
  gulp.src('./src/images/**/*.*').pipe(gulp.dest(buildFolder + '/images'));
  callback();
});


gulp.task('watch-wp-content', function () {
  gulp.watch(['./wp-content/themes/**/*.*'], ['copy-wp-content']);
});

gulp.task('copy-wp-content', function () {
  gulp.src('./wp-content/themes/**/*.*').pipe(gulp.dest('../fthelp-staging/wp-content/themes'));
});

// gulp.task('wp-local', function(callback) {
//   runSequence('clean-build', 'build-css', 'copy-template', 'copy-images', 'deploy-theme', callback);
// });


var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var rename = require('gulp-rename');
var obt = require('origami-build-tools');
var buildFolder = './wp-content/themes/fthelp';
var paths = {
  scss: ['./src/scss/style.scss'],
  watch: ['./src/scss/**/*.scss', './src/templates/**/*.php', './src/images/**/*.*']
}

gulp.task('build', function(callback) {
  runSequence('clean-build', 'build-css', 'copy-template', 'copy-images', callback);
});

gulp.task('clean-build', function(callback){
  return del(buildFolder, callback);
});

gulp.task('build-css', function () {
  return obt.build.sass(gulp, {sass: paths.scss, buildFolder: buildFolder, sourcemaps: 'inline', buildCss: 'style.css'});

});

gulp.task('copy-template', function () {
  return gulp.src('./src/templates/**/*.*').pipe(gulp.dest(buildFolder));
});

gulp.task('copy-images', function () {
  return gulp.src('./src/images/**/*.*').pipe(gulp.dest(buildFolder + '/images'));
});

// gulp.task('rename-css', function (callback) {
//   gulp.src(buildFolder + '/main.css')
//   .pipe(rename('style.css'))
//   .pipe(gulp.dest(buildFolder));
// });

gulp.task('releases', function() {
    obt.build.sass(gulp, {sass: paths.scss, buildFolder: buildFolder, env:'production'});
});

gulp.task('verify', function() {
    obt.verify(gulp, {
        sass: paths.scss
    });
});

gulp.task('watch', function () {
  gulp.watch(paths.watch, ['build']);
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


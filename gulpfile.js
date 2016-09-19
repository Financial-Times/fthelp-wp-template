var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var rename = require('gulp-rename');
var obt = require('origami-build-tools');
var buildFolder = './wp-content/themes/fthelp';
var paths = {

  scss: ['./src/scss/style.scss'],
  watch: ['./src/scss/*.scss']
}

gulp.task('build', function(callback) {
  console.log('build');
  runSequence('clean-build', 'build-css', 'copy-template', callback);

});

gulp.task('clean-build', function(callback){
  return del(buildFolder, callback);
});

gulp.task('build-css', function () {
  console.log('build-css');
  return obt.build.sass(gulp, {sass: paths.scss, buildFolder: buildFolder, sourcemaps: 'inline', buildCss: 'style.css'});

});

gulp.task('copy-template', function () {
  console.log('copy-template');
  return gulp.src('./src/templates/**').pipe(gulp.dest(buildFolder));
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
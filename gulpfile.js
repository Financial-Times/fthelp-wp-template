var gulp = require('gulp');
var obt = require('origami-build-tools');
var buildFolder = 'wp-content/themes/fthelp';
var paths = {
  scss: ['./src/scss/main.scss'],
  watch: ['./src/scss/*.scss']
}

gulp.task('build', function() {
    obt.build.sass(gulp, {sass: paths.scss, buildFolder: buildFolder, sourcemaps: 'inline'});
});

gulp.task('releases', function() {
    obt.build.sass(gulp, {sass: path.scss, buildFolder: buildFolder, env:'production'});
});

gulp.task('verify', function() {
    obt.verify(gulp, {
        sass: path.scss
    });
});

gulp.task('watch', function () {
  gulp.watch(paths.watch, ['build']);
});
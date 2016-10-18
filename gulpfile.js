var fs = require('fs');
var package = require('./package.json');
var gulp = require('gulp-param')(require('gulp'), process.argv);
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

var rename = require('gulp-rename');
var obt = require('origami-build-tools');

var buildFolder = '';
var themeName = '';
var environment = 'development';

var cheerio = require('cheerio');
var handlebars = require('handlebars');
var request = require("request");
// var read = require('read-file');

var footerTemplate = fs.readFileSync('./src/handlebars/footer.handlebars', 'utf8');



var paths = {
  scss: ['./src/scss/main.scss'],
  js : ['./src/js/main.js'],
  watch: ['./src/scss/**/*.scss', './src/js/**/*.js', './src/templates/**/*.php', './src/images/**/*.*']
}

function setBuildFolder(folder, theme) {
  if (theme && buildFolder.indexOf(theme)===-1) {
    buildFolder = folder += theme;
  }
}

function setEnvironment(env) {
  environment = (env === 'prod')? 'production' : 'development';
}

function savePackageJSON() {
  fs.writeFile('./package.json', JSON.stringify(package, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('The package version number ' + package.version + ' has been created!');
  });
}

function majorVersionRelease() {
  var version = package.version.split('.');
  var majorVersion = Number(version[0]);
  version[0] = majorVersion+=1;
  for (var i = 1; i < version.length; i++){
    version[i] = 0;
  }
  package.version = version.join('.');
  savePackageJSON();
}

function minorVersionDevelopment() {
  var version = package.version.split('.');
  for (var i = 1; i < version.length; i++){
    version[i] = Number(version[i]);
  }
  if(version[2]<9){
    version[2]+=1;
  } else {
    version[1]+=1;
    version[2] = 0;
  }
  package.version = version.join('.');
  savePackageJSON();
}


gulp.task('devVersion', function (callback) {
  minorVersionDevelopment();
  callback();
});

gulp.task('build', function(theme, env, themeFolder, callback) {
  setEnvironment(env);
  themeName = theme + '-' + environment + '-' + package.version;
  setBuildFolder(themeFolder, themeName);
  runSequence('clean-build', 'obt-css', 'obt-js', 'build-footer', 'copy-templates', 'copy-images', callback);
});

gulp.task('release', function (theme, themeFolder, callback) {
  setEnvironment('prod');
  majorVersionRelease();
  themeName = theme + '-' + environment + '-' + package.version;
  setBuildFolder(themeFolder, themeName);
  console.log('release: ', buildFolder);
  runSequence('clean-build', 'obt-css', 'obt-js', 'copy-templates', 'copy-images', callback);
});

gulp.task('watch', function () {
  gulp.watch(paths.watch, ['build']);
});


gulp.task('obt-css', function(){
  return obt.build.sass(gulp, {sass: paths.scss, buildFolder: buildFolder, buildCss: 'style.css', env: environment});
});
gulp.task('obt-js', function(){
  return obt.build.js(gulp, {js: paths.js, buildFolder: buildFolder + '/js', env: environment});
});

gulp.task('copy-templates', function () {
  return gulp.src('./src/templates/**/*.*').pipe(gulp.dest(buildFolder));
});
gulp.task('copy-images', function () {
  return gulp.src('./src/images/**/*.*').pipe(gulp.dest(buildFolder + '/images'));
});


gulp.task('clean-build', function(callback){
  return gulp.src(buildFolder, {read:false}).pipe(clean({force:true}));
});

gulp.task('build-footer', function(callback){
  request("https://www.ft.com", function(error, response, body) {
    var $ = cheerio.load(body);
    var footer = $.html('footer.o-footer');
    footer = footer.replace(/href="\//g, 'href="https:\/\/www.ft.com\/')
    var template = handlebars.compile(footerTemplate);
    fs.writeFile('./src/templates/footer.php', template({footer:footer}), function(err) {
      if(err) {
          return console.log(err);
      }
      callback();
    });
  });
});




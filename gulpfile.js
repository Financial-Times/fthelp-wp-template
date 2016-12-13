var fs = require('fs');
var package = require('./package.json');
var gulp = require('gulp-param')(require('gulp'), process.argv);
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var obt = require('origami-build-tools');
var cheerio = require('cheerio');
var handlebars = require('handlebars');
var request = require("request");

var isConfigSet = false;
var buildFolder = '';
var themeName = '';
var environment = 'development';


var footerTemplate = fs.readFileSync('./src/handlebars/footer.handlebars', 'utf8');
var headerTemplate = fs.readFileSync('./src/handlebars/header.handlebars', 'utf8');

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

function setBuildConfig(theme, env, themeFolder, version) {
  if (isConfigSet) {
    return;
  }
  isConfigSet = true;
  console.log('setBuildConfig');

  setEnvironment(env);
  themeName = theme + '-' + environment + '-' + (version||package.version);
  setBuildFolder(themeFolder, themeName);
}

gulp.task('build', function(theme, env, themeFolder, version, callback) {
  setBuildConfig(theme, env, themeFolder, version);
  runSequence('clean-build', 'obt-css', 'obt-js', 'copy-templates', 'copy-images', callback);
});

gulp.task('build-prod', function(theme, env, themeFolder, version, callback) {
  setBuildConfig(theme, env, themeFolder, version);
  runSequence('clean-build', 'obt-css', 'obt-js', 'copy-templates', 'copy-images', callback);
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


gulp.task('build-ft-navigation', function(theme, env, themeFolder, version, callback){
  setBuildConfig(theme, env, themeFolder, version);

  request("https://www.ft.com", function(error, response, body) {
    var $ = cheerio.load(body);
    // TODO remove open in app or webapp logic and only keep optout for non anoynmous
    $('#o-header-drawer .o-header__drawer-menu-item a.js-optout-link')
    .attr('hidden', 'true')
    .clone(true)
    .removeClass('o-header__drawer-menu-button')
    .addClass('o-footer__matrix-link')
    .insertBefore($('.o-footer__matrix-column a.js-webapp-link'));

    $('.o-header__drawer-menu-item .js-optout-link, .o-header__drawer-menu-item .js-webapp-link, .o-header__drawer-menu-item .js-android-link').addClass('o-buttons o-buttons--standout');

    $('.o-header__drawer-menu-link[data-trackable="Help Centre"]')
    .addClass('o-header__drawer-menu-link--selected')
    .attr('selected', 'true');

    $('.o-header__drawer-menu-link[data-trackable="Home"]')
    .removeClass('o-header__drawer-menu-link--selected')
    .attr('selected', 'false');

    $('.o-header__nav-link[data-trackable="Home"]')
    .attr('aria-selected', 'false');


    $('.o-header--sticky').attr('data-o-component', 'o-header');

    $('.o-header__mega').remove();

    var footer = $.html('footer.o-footer') + $.html('#o-header-drawer');

    footer = footer.replace(/href="\//g, 'href="https:\/\/www.ft.com\/');

    var template = handlebars.compile(footerTemplate);
    fs.writeFileSync(buildFolder + '/footer.php', template({footer:footer}));

    var header = $.html('header');
    header = header.replace(/href="\//g, 'href="https:\/\/www.ft.com\/')

    template = handlebars.compile(headerTemplate);
    fs.writeFileSync(buildFolder + '/header.php', template({header:header}));

    callback();

  });
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

gulp.task('build-header', function(callback){
  request("https://www.ft.com", function(error, response, body) {
    var $ = cheerio.load(body);
    var header = $.html('header');
    header = header.replace(/href="\//g, 'href="https:\/\/www.ft.com\/')
    var template = handlebars.compile(headerTemplate);
    fs.writeFile('./src/templates/header.php', template({header:header}), function(err) {
      if(err) {
          return console.log(err);
      }
      callback();
    });
  });
});



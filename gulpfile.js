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
var themeInfo = '';


var footerTemplate = fs.readFileSync('./src/handlebars/footer.handlebars', 'utf8');
var headerTemplate = fs.readFileSync('./src/handlebars/header.handlebars', 'utf8');
var themeInfoTemplate = fs.readFileSync('./src/handlebars/themeInfo.handlebars', 'utf8');

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



function setBuildConfig(theme, env, themeFolder, version) {
  if (isConfigSet) {
    return;
  }
  isConfigSet = true;
  console.log('setBuildConfig');

  setEnvironment(env);

  themeName = theme + '-' + environment + '-' + (version||package.version);

  var template = handlebars.compile(themeInfoTemplate);

  themeInfo = template({
    name: theme,
    version:(version||package.version),
    environment:env,
    description: package.description,
    author : package.author,
    homepage: package.homepage
  });

  setBuildFolder(themeFolder||'wp-content/themes/', themeName);
}

gulp.task('build', function(theme, env, themeFolder, version, callback) {
  setBuildConfig(theme, env, themeFolder, version);
  runSequence('clean-build', 'obt-css', 'obt-js', 'copy-templates', 'copy-images', 'write-theme-info', callback);
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

gulp.task('write-theme-info', function(callback){
  var styleContent = fs.readFileSync(buildFolder + '/style.css', 'utf8');

  fs.writeFile(buildFolder + '/style.css', themeInfo + styleContent, function(err) {
    if(err) {
        return console.log(err);
    }
    callback();
  });

});







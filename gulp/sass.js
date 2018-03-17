'use strict';

var path = require('path');
var autoprefixer = require('autoprefixer');
var pobem = require('pobem');
var gulpif = require('gulp-if');
var sassGlob = require('gulp-sass-glob');
var sassMobuleImporter = require("sass-module-importer");
module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;
  var entries = config.entries;
  var dest = path.join(taskTarget, dirs.styles.replace(/^_/, ''));
  gulp.task('sass', function() {
    
    gulp.src(path.join(dirs.source, dirs.styles, 'main.{sass,scss}'))
      .pipe(sassGlob())
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        importer: sassMobuleImporter(),
        outputStyle: 'compressed',
        precision: 10,
      }))
      .on('error', function(err) {
        plugins.util.log(err);
      })
      .on('error', plugins.notify.onError(config.defaultNotification))
      .pipe(plugins.postcss([autoprefixer({browsers: ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4']}), pobem]))
      .pipe(plugins.rename(function(filepath) {
        filepath.dirname = filepath.dirname.replace(dirs.source, '').replace('_', '');
      }))
      .pipe(gulpif(args.production, plugins.cssnano({rebase: false})))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({match: '**/*.css'}));
  });
};

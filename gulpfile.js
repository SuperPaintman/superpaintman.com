'use strict';
/** Requires */
const fs            = require('fs');
const path          = require('path');

const gulp          = require('gulp');
const $             = require('gulp-load-plugins')();

const del           = require('del');
const yaml          = require('js-yaml');

/** Helps */
function onError(err) {
  $.util.log($.util.colors.red('Error'), err.toString());

  this.end();
}

/** Constants */
const paths = {
  templates: {
    from: [
      './src/templates/views/**/*.pug'
    ],
    watch: [
      './config.yml',
      './src/styles/**/*.styl',
      './src/js/**/*.js',
      './src/templates/**/*.pug'
    ],
    to: './public'
  }
};

/** Tasks */
gulp.task('build:templates', () => {
  const locals = yaml.load(
    fs.readFileSync(path.join(__dirname, './config.yml')).toString()
  );

  return gulp.src(paths.templates.from)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.pug({
      pretty: true,
      locals: locals
    }))
    .pipe(gulp.dest(paths.templates.to));
});

gulp.task('clear', () => {
  return Promise.all([
    del(path.join(__dirname, paths.templates.to, './**/*'))
  ]);
});

gulp.task('build', ['build:templates']);

gulp.task('watch:templates', () => {
  gulp.watch(paths.templates.watch, ['build:templates']);
});

gulp.task('watch', ['watch:templates']);

gulp.task('default', ['clear', 'build']);

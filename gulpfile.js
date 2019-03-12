var gulp = require('gulp'),
    jade = require('gulp-jade'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');

gulp.task('views', function(){
  gulp.src(['src/views/*.jade'])
      .pipe(jade())
      .pipe(gulp.dest('www'));

});

gulp.task('templates', function(){
  gulp.src(['src/templates/*.jade'])
  .pipe(jade())
  .pipe(gulp.dest('www/templates'));
})

gulp.task('watch',['build'], function(){
  gulp.watch(['src/views/*.jade'], ['views']);
  gulp.watch(['src/templates/*.jade'], ['templates']);
  gulp.watch(['src/js/**/*.js'], ['js:concat']);
  gulp.watch(['www/**/*'], ['livereload']);
});

gulp.task('connect', function(){
  connect.server({
    root: 'www',
    livereload: true
  });
});

gulp.task('livereload', function(){
  gulp.src(['www/**/*'])
    .pipe(connect.reload());
})

gulp.task('js:libs', function(){
  gulp.src(['bower_components/angularjs/angular.js', 'bower_components/angular-route/angular-route.js',
  'bower_components/jquery/dist/jquery.js', 'bower_components/jquery-ui/jquery-ui.js'])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('build',['views', 'templates', 'js:libs', 'js:concat']);

gulp.task('js:hint', function(){
  gulp.src(['src/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
})

gulp.task('js:concat',['js:hint'], function(){
  gulp.src(['src/js/**/main.js','src/js/**/*.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('default', ['watch', 'connect']);

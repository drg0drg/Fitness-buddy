gulp.task('pug', function() {
  return gulp
    .src('../views/*.pug')
    .pipe(
      pug({
        pretty: true,
        locals: { path: require('path') }
      })
    )
    .pipe(gulp.dest('./'));
});

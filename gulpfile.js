var spawn = require('child_process').spawn;
var babel = require('gulp-babel');
var gulp = require('gulp');

var node = null;
var mocha = null;


gulp.task('build', function () {
  return Promise.all([
    new Promise(function (resolve, reject) {
      var task = gulp.src('./src/**/*.js')
        .pipe(babel({optional: ['runtime'], stage: 0}))
        .pipe(gulp.dest('./build'));
      task.on('error', reject);
      task.on('end', resolve);
    }),
    new Promise(function (resolve, reject) {
      var task = gulp.src('./src/**/*.yaml').pipe(gulp.dest('./build'));
      task.on('error', reject);
      task.on('end', resolve);
    })
  ]);
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*', ['restart']);
});

gulp.task('restart', ['build'], function () {
  if (node) node.kill()
  node = spawn('node', ['build'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) console.error('Error detected, waiting for changes...');
  });
});

gulp.task('mocha', ['build'], function () {
  if (mocha) mocha.kill()
  node = spawn('npm', ['test'], {stdio: 'inherit'})
});

gulp.task('test', ['mocha'], function () {
  gulp.watch('./src/**/*', ['mocha']);
})

gulp.task('default', ['restart', 'watch']);

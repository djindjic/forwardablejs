var gulp        = require('gulp'),
    semver      = require('semver'),
    shell       = require('gulp-shell'),
    watch       = require('gulp-watch'),
    bump        = require('gulp-bump'),
    pkg         = require('./package.json');

gulp.task('deploy-master', function(){
  var newVer = semver.inc(pkg.version, 'patch');
  return gulp.src(['./package.json'])
    .pipe(bump({version: newVer}))
    .pipe(gulp.dest('./'))
    .on('end', shell.task([
            'cat $DEPLOY_KEY > .travis/deploy_key.pem',
            'chmod 600 .travis/deploy_key.pem',
            'ssh-add .travis/deploy_key.pem',
            'git config --global user.email "travis@deploy.com"',
            'git config --global user.name "Travis Deploy"',
            'git add --all',
            'git commit -m "' + newVer + '"', 
            'git tag -a "' + newVer + '" -m "' + newVer + '"',
            'git push origin master', 
            'git push origin --tags'
           ]));

});

gulp.task('jspm-link', function(cb) {
  watch(['lib/**/*'], shell.task(['jspm link github:djindjic/forwardablejs@' + pkg.version + ' -y']));
});
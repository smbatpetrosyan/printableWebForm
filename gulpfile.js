var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    include = require("gulp-include")
    runSequence = require('run-sequence');

gulp.task('lint', function() {
    return gulp.src('./js/*.js')
        .pipe(jshint());
});
gulp.task('compress', function() {
    return gulp.src(['./js/*.js']) 
        .pipe(uglify())
        .pipe(concat('compress.js'))
        .pipe(gulp.dest('./gulp/'));
});
gulp.task('minifyCss', function() {
    return gulp.src('./css/*.css')
        .pipe(minifyCss())
        .pipe(concat('absolute.css'))
        .pipe(gulp.dest('./gulp/'));
});
gulp.task("includes", function() {
    return gulp.src("./applicationFormGulp.html")
        .pipe(include())
        .pipe(concat('printableWebForm.html'))
        .pipe(gulp.dest("./gulp/"));
});
gulp.task('printableWebForm', function(callback) {
    runSequence('lint', 'compress', 'minifyCss', 'includes', callback);
});
gulp.task('default', ['printableWebForm']);
/*
sudo npm install jshint gulp-jshint --save-dev
sudo npm install --save-dev gulp-uglify
sudo npm install --save-dev gulp-minify-css
sudo npm install --save-dev gulp-concat
sudo npm install gulp-include
sudo npm install --save-dev run-sequence
*/
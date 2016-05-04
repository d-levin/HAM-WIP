/* Auto build .scss files */

var gulp = require('gulp');
var sass = require('gulp-sass');

var input = './public/css/*.scss';
var output = './public/css';

gulp.task('sass', function() {
    return gulp
        // Find all `.scss` files from the `scss/` folder
        .src(input)
        // Run Sass on those files
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest(output));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('public/css/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'watch']);

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


var scriptLocations = ['src/app/app.js', 'src/app/components/**/*.js', 'src/app/js/**/*'];

// Auto server running
var express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendfile('index.html', { root: 'dist' });
});

// Lint Task
gulp.task('lint', function() {
    gulp.src(scriptLocations)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    console.log('Lint completely');
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Style css
gulp.task('styles', function() {
   gulp.src('src/app/styles/**/*')
        .pipe(gulp.dest('dist/styles'));
    console.log('Styles completely');
});

// Bower copying
gulp.task('bowerCopying', function() {
    gulp.src('bower_components/**/*')
        .pipe(gulp.dest('dist/bower_components/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src(scriptLocations)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    console.log('Scripts completely');
});

// Views task
gulp.task('views', function () {
    // Get our index.html
    gulp.src('src/app/index.html')
    // And put it in the dist folder
    .pipe(gulp.dest('dist/'));

    // Any other view files from app/views
    gulp.src('src/app/components/**/*.html')
    // Will be put in the dist/views folder
    .pipe(gulp.dest('dist/views/'));
    console.log('Views completely');
});



// Dev task
gulp.task('dev', ['views', 'scripts', 'bowerCopying', 'lint', 'styles'], function() { });


gulp.task('watch', ['lint'], function() {
    // Start webserver
    server.listen(serverport);
    // Start live reload
    refresh.listen(livereloadport);

    gulp.watch(scriptLocations,['lint']);

    gulp.watch(scriptLocations,['scripts']);

    gulp.watch('src/app/styles/*.css',['styles']);

    gulp.watch(['src/app/**/*.html'], ['views']);

    gulp.watch('./dist/**').on('change', refresh.reload);

});

gulp.task('default', ['dev', 'watch']);

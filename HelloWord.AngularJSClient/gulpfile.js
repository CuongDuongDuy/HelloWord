var gulp = require("gulp");
var jshint = require("gulp-jshint");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

var express = require("express");
var refresh = require("gulp-livereload");
var livereload = require("connect-livereload");

var configs = {
    server: {
        port: 5000,
        lieverloadPort : 35729
    },
    path: {
        script: ["src/app/app.js", "src/app/components/**/*.js", "src/app/js/**/*"],
        html: ["src/app/app.js", "src/app/components/**/*.js", "src/app/js/**/*"],
        style:["src/app/app.js", "src/app/components/**/*.js", "src/app/js/**/*"],
        destination: "./dist"
    }
};

var server = {
    port: configs.server.port,
    liveverloadPort: configs.server.lieverloadPort,
    basePath: configs.path.destination,
    refresh: null,
    start: function() {
        var server = express();
        server.use(livereload());
        server.use(express.static(basePath));
        server.listen(this.port);
    },
    liveStart: function() {
        this.start();
        this.liveLoad();
    },
    liveverLoad: function() {
        this.refresh = refresh;
        this.refresh.listen(this.liveverloadPort);
    },
    notify: function() {
        this.refresh.changed();
    }
};

// Lint Task
gulp.task("lint", function() {
    gulp.src(configs.path.script)
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

// Compile Our Sass
gulp.task("sass", function() {
    gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"));
});

// Style css
gulp.task("styles", function() {
   gulp.src("src/app/styles/**/*")
        .pipe(gulp.dest("dist/styles"));
});

// Bower copying
gulp.task("bowerCopying", function() {
    gulp.src("bower_components/**/*")
        .pipe(gulp.dest("dist/bower_components/"));
});

// Concatenate & Minify JS
gulp.task("scripts", ["lint"], function() {
    gulp.src(configs.path.script)
        .pipe(concat("all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(configs.destination + "/js"));
});

// Views task
gulp.task("views", function () {
    gulp.src("src/app/index.html")
    .pipe(gulp.dest("dist/"));

    gulp.src("src/app/components/**/*.html")
    .pipe(gulp.dest("dist/views/"));
});




gulp.task("dev", ["lint","styles", "views", "scripts", "bowerCopying"], function() {
    server.liveStart();
});

gulp.task("watch", function() {
    
    gulp.watch(configs.path.script, ["scripts"]);

    gulp.watch("src/app/styles/*.css",["styles"]);

    gulp.watch(["src/app/**/*.html"], ["views"]);

    gulp.watch("./dist/**", function() {
        server.notify();
    });
});

gulp.task("default", ["dev", "watch"]);

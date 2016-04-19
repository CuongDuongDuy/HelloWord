var gulp = require("gulp");
var jshint = require("gulp-jshint");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var open = require('gulp-open');
var connect = require("connect-livereload");

var configs = {
    server: {
        port: 5000,
        livereloadPort: 35729
    },
    client: {
        schema: 'http',
        host:'localhost',
        page:'index'
    },
    path: {
        script: {
            app: "src/app/app.js",
            views: "src/app/views/**/*.js",
            others: "src/app/js/**/*.js",
            all: ["src/app/app.js","src/app/views/**/*.js" ,"src/app/js/**/*.js"]
        },
        html: ["src/app/views/**/*.html", "src/app/js/**/*.html"],
        style: ["src/app/styles/**/*.css"],
        destination: "./dist"
    }
};

var server = {
    lr: null,
    start: function() {
        var express = require("express");
        var server = express();
        server.use(require('connect-livereload')());
        server.use(express.static(configs.path.destination));
        server.listen(configs.server.port);
    },
    liveStart: function() {
        this.start();
        this.livereLoad();
    },
    livereLoad: function() {
        this.lr = require('tiny-lr')();
        this.lr.listen(configs.server.livereloadPort);
    },
    notify: function(event) {
        var fileName = require('path').relative(configs.path.destination, event.path);

        server.lr.changed({
            body: {
                files: [fileName]
            }
        });
    }
};

// Lint Task
gulp.task("lint", function() {
    gulp.src(configs.path.script.all)
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
   gulp.src(configs.path.style)
        .pipe(gulp.dest("dist/styles"));
});

// Bower copying
gulp.task("bowerCopying", function() {
    gulp.src("bower_components/**/*")
        .pipe(gulp.dest("dist/bower_components/"));
});

// Concatenate & Minify JS
gulp.task("scripts", ["lint"], function() {
    /*gulp.src(configs.path.script.app)
        .pipe(uglify())
        .pipe(gulp.dest(configs.path.destination));

    gulp.src(configs.path.script.views)
        .pipe(uglify())
        .pipe(gulp.dest(configs.path.destination + "/js"));

    gulp.src(configs.path.script.others)
        .pipe(uglify())
        .pipe(gulp.dest(configs.path.destination + "/js"));*/
    gulp.src(configs.path.script.all)
        .pipe(concat("all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(configs.path.destination));
});

// Views task
gulp.task("views", function () {
    gulp.src("src/app/index.html")
    .pipe(gulp.dest("dist/"));

    gulp.src(configs.path.html)
    .pipe(gulp.dest("dist/views/"));
});

//Opening task
gulp.task("open", function(){
    gulp.src(configs.path.destination + '/index.html')
        .pipe(open({ uri:configs.client.schema + '://'+configs.client.host+':'+configs.server.port+'/'}))
});

gulp.task("dev", ["lint","styles", "views", "scripts", "bowerCopying"], function() {
    server.liveStart();
});

gulp.task("watch", function() {

    gulp.watch(configs.path.script.all,["scripts"]);

    gulp.watch(configs.path.style,["styles"]);

    gulp.watch(configs.path.html, ["views"]);

    gulp.watch(configs.path.destination + '**/*', server.notify )

});


gulp.task("default", ["dev", "open", "watch"]);

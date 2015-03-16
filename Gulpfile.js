(function () {
    "use strict";

    var gulp = require("gulp");

    var args = require("yargs").argv;
    var clean = require("gulp-clean");
    var uglify = require("gulp-uglify");
    var concat = require("gulp-concat");
    var gulpif = require("gulp-if");
    var less = require("gulp-less");
    var minifycss = require('gulp-minify-css');
    var rename = require('gulp-rename');
    var plumber = require("gulp-plumber");
    var es = require('event-stream');

    var bases = {
        app: './app/',
        dist: './dist/'
    };

    var vendorPaths = {
        scripts: [
            "bower_components/jquery/dist/jquery.js",
            "bower_components/semantic-ui/dist/semantic.js",
            "bower_components/angular/angular.js",
            "bower_components/angular-route/angular-route.js",
            "bower_components/angular-animate/angular-animate.js",
            "bower_components/angular-resource/angular-resource.js",
            "bower_components/angular-sanitize/angular-sanitize.js"
        ],
        style: [
            "bower_components/semantic-ui/dist/semantic.css"
        ],
        assets: [
            "bower_components/semantic-ui/themes/default/assets/**/*.*"
        ]
    };

    // Delete the dist directory
    gulp.task('clean', function () {
        return gulp.src('./public/')
            .pipe(clean());
    });

    //copy vendor files to public
    gulp.task('vendor', ['clean'], function () {
        return es.concat(
            gulp.src(vendorPaths.scripts)
                .pipe(concat('vendor.js'))
                .pipe(gulp.dest(bases.dist + 'js')),

            gulp.src(vendorPaths.style)
                .pipe(concat('vendor.css'))
                .pipe(gulp.dest(bases.dist + 'style')),

            gulp.src(vendorPaths.assets)
                .pipe(gulp.dest(bases.dist))
        );
    });

    //compile less
    gulp.task('less', ['clean'], function () {
        gulp.src(bases.app + 'less/*.less')
            .pipe(concat("main.css"))
            .pipe(less())
            .pipe(gulp.dest(bases.dist + 'style'));
    });

    gulp.task("js", ['clean'], function () {
        return gulp.src(bases.app + 'js/*.js')
            .pipe(plumber())
            .pipe(concat("app.js"))
            .pipe(gulpif(!args.debug, uglify()))
            .pipe(gulp.dest(bases.dist + 'js'));
    });

    gulp.task("html", ['clean'], function () {
        return gulp.src(bases.app + 'view/*.html')
            .pipe(gulp.dest(bases.dist + 'view'));
    });

    gulp.task("img", ['clean'], function () {
        return gulp.src(bases.app + 'fonts/*.*')
            .pipe(gulp.dest(bases.dist));
    });


    gulp.task("watch", function () {
        gulp.watch(bases.app + 'js', ["js"]);
        gulp.watch(bases.app + 'less', ["less"]);
        gulp.watch(bases.app + 'view', ["html"]);
        gulp.watch(bases.app + 'img', ["img"]);
    });

    gulp.task("build", ["clean", "vendor", "less", "js", "html", "img"]);

    gulp.task("default", ["build", "watch"]);
})();
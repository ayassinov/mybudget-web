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
        app: 'web/',
        dist: './public/'
    };

    var vendorPaths = {
        scripts: [
            "bower_components/angular/angular.js",
            "bower_components/angular-route/angular-route.js",
            "bower_components/angular-animate/angular-animate.js",
            "bower_components/angular-resource/angular-resource.js",
            "bower_components/angular-sanitize/angular-sanitize.js",
            "bower_components/jquery/dist/jquery.js",
            "bower_components/semantic-ui/build/packaged/javascript/semantic.js"
        ],
        style: [
            "bower_components/semantic-ui/build/packaged/css/semantic.css"
        ],
        images: [
            "bower_components/semantic-ui/build/packaged/images/*.*"
        ],
        fonts: [
            "bower_components/semantic-ui/build/packaged/fonts/*.*"
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
                .pipe(gulp.dest('./public/js')),

            gulp.src(vendorPaths.style)
                .pipe(concat('vendor.css'))
                .pipe(gulp.dest('./public/style')),

            gulp.src(vendorPaths.images)
                .pipe(gulp.dest('./public/img')),

            gulp.src(vendorPaths.fonts)
                .pipe(gulp.dest('./public/fonts'))
        );
    });

    //compile less
    gulp.task('less', ['clean'], function () {
        gulp.src('./web/less/*.less')
            .pipe(concat("main.css"))
            .pipe(less())
            .pipe(gulp.dest('./public/style'));
    });

    gulp.task("js", ['clean'], function () {
        return gulp.src('./web/js/*.js')
            .pipe(plumber())
            .pipe(concat("app.js"))
            .pipe(gulpif(!args.debug, uglify()))
            .pipe(gulp.dest("./public/js"));
    });

    gulp.task("html", ['clean'], function () {
        return gulp.src('./web/view/*.html')
            .pipe(gulp.dest("./public/view"));
    });

    gulp.task("img", ['clean'], function () {
        return gulp.src('./web/img/*.*')
            .pipe(gulp.dest("./public/img"));
    });


    gulp.task("watch", function () {
        gulp.watch("./web/js", ["js"]);
        gulp.watch("./web/less", ["less"]);
        gulp.watch("./web/view", ["html"]);
        gulp.watch("./web/img", ["img"]);
    });

    gulp.task("build", ["clean", "vendor", "less", "js", "html", "img"]);

    gulp.task("default", ["build", "watch"]);
})();
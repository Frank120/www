/**
 * Created by frank.wang on 2016/10/13.
 */
var url        = require('url');
var fs         = require('gulp-fs');
var path       = require('path');

var gulp       = require('gulp');
var livereload = require('gulp-livereload');
var webserver  = require('gulp-webserver');

//web server

gulp.task('webserver',function(){

    gulp.src('./src')//Server root directory

        .pipe(webserver({ //run gulp-webserver

            port:8080,

            livereload:true,

            open:true,

            directoryListing:{

                enable:true,

                path:'./src'
            },

            middleware:function(req,res,next) {

                //mock local data

                var urlObject = url.parse(req.url, true),
                    mrnyhod = req.method;

                if (!urlObject.pathname.match(/^\/api/)){ //not api data run next

                    next();

                    return;
                }

                var mockDataFile = path.join(_dirname,urlObject.pathname)+".js";
            }

        }))
});

//gulp.task('watch',function(){
//    gulp.watch('./src/*.html',['html']);
//});
//
//gulp.task('connect',function(){
//    connect.server({
//        root:"./",
//        ip:"192.168.31.110",
//        livereload:true
//    })
//});
//
//gulp.task('html',function(){
//    gulp.src('./src/*.html')
//        .pipe(connect.reload());
//});
//
//gulp.task('default',['connect','watch']);
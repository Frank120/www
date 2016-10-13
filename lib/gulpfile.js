/**
 * Created by frank.wang on 2016/9/18.
 */
/**
 * Created by anianj on 6/29/15.
 */
var gulp        = require('gulp'),
    _           = require('underscore'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    jade        = require('gulp-jade'),
    sass        = require('gulp-sass'),
    sassify     = require('sassify'),
    minCss      = require('gulp-clean-css'),
    uglify      = require('gulp-uglify'),
    compass     = require('compass-importer'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    sprintf = require('underscore.string/sprintf'),
    plumber = require('gulp-plumber'), // Prevent pipe breaking caused by errors from gulp plugins
    watch = require('gulp-watch'); // More reliable watch

// FOR FAST DEV: RECOMPILING ONLY THE WIP FILE, DISABLE (||) , TO ENABLE(&&)

specificRecompile = { feed:'', jade:'*'}
    //&& { feed:'', jade:'hotel-property--lengs'}
    ,svgSprite  = require("gulp-svg-sprite")
;

function getBundleFiles(src) {
    var fs = require("fs");
    debugger
    if (fs.existsSync(src)) {
        return fs.readdirSync(src);
    }
    return null;
}

function buildBundleFeeds(bundleFiles, src, dest){
    var fs = {};
    for(var f in bundleFiles) {
        fs[src + bundleFiles[f]] = dest + bundleFiles[f];
    }
    return fs;
}

gulp.task("bundle",function(){
    var feedDir = "./src/module/feed/";
    var feedDes = "./build/bundle/";
    var fs = require("fs");
    if (!fs.existsSync(feedDes)) {
        fs.mkdirSync(feedDes, 0777)
    }
    var opts = {
        //Put your feeds here (feeds are entries javascript for page)
        "feeds": buildBundleFeeds(getBundleFiles(feedDir), feedDir, feedDes),
        "debug": true
    };

    // Specific Recompile - for fast DEV
    if(specificRecompile.feed) {
        var defaultJs = specificRecompile.quickbook ? ['default-quick-book'] : ['default'];
        opts.feeds = _.reduce(defaultJs.concat([specificRecompile.feed]),function(hash,key){
            hash[sprintf('./src/module/feed/%s.js', key)] = sprintf('./build/bundle/%s.js', key);
            return hash;
        },{});
    }

    browserify(_.keys(opts.feeds),opts)
        .transform(sassify, {
            'auto-inject': true, // Inject css directly in the code
            base64Encode: specificRecompile.feed!='', // Use base64 to inject css
            sourceMap: true
        })
        .plugin('factor-bundle', {outputs: _.values(opts.feeds)})
        .bundle()
        .pipe(plumber())
        .pipe(source('common.js'))
        .pipe(gulp.dest(feedDes));
});

gulp.task("minify_feeds", function(){
    var feedDir = "./prod/bundle/";
    gulp.src([feedDir + "*.js","!" + feedDir + "common.js"]).pipe(uglify()).pipe(gulp.dest(feedDir));
});

gulp.task("prod_begin", function(){
    gulp.src("./src/config/prod/host.js")
        .pipe(gulp.dest("./src/config/"));
});

gulp.task("bundle_prod", function(){
    var feedDir = "./src/module/feed/";
    var feedDes = "./prod/bundle/";
    var fs = require("fs");
    if (!fs.existsSync(feedDes)) {
        fs.mkdirSync(feedDes, 0777)
    }
    var opts = {
        //Put your feeds here (feeds are entries javascript for page)
        "feeds": buildBundleFeeds(getBundleFiles(feedDir), feedDir, feedDes),
        "debug": false
    };

    browserify(_.keys(opts.feeds),opts)
        .transform(sassify, {
            'auto-inject': true, // Inject css directly in the code
            base64Encode: false, // Use base64 to inject css
            sourceMap: false
        })
        .plugin('factor-bundle', {outputs: _.values(opts.feeds)})
        .bundle()
        .pipe(plumber())
        .pipe(source('common.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(feedDes));

});

gulp.task("bundle_dev", function(){
    var feedDir = "./src/module/feed/";
    var feedDes = "./prod/bundle/";
    var fs = require("fs");
    if (!fs.existsSync(feedDes)) {
        fs.mkdirSync(feedDes, 0777)
    }
    var opts = {
        //Put your feeds here (feeds are entries javascript for page)
        "feeds": buildBundleFeeds(getBundleFiles(feedDir), feedDir, feedDes),
        "debug": false
    };

    browserify(_.keys(opts.feeds),opts)
        .transform(sassify, {
            'auto-inject': true, // Inject css directly in the code
            base64Encode: false, // Use base64 to inject css
            sourceMap: true
        })
        .plugin('factor-bundle', {outputs: _.values(opts.feeds)})
        .bundle()
        .pipe(plumber())
        .pipe(source('common.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest(feedDes));
});

gulp.task("prod_end", function(){
    gulp.src("./src/config/dev/host.js")
        .pipe(gulp.dest("./src/config/"));
});

gulp.task("styles", function(){

    gulp.src("./src/assets/style/fonts/*.*")
        .pipe(gulp.dest("./build/assets/style/fonts/"));

    var cssFiles = specificRecompile.quickbook ? ['./src/assets/style/default-quick-book.sass'] : ['./src/assets/style/default.sass','./src/assets/style/default2.sass','./src/assets/style/default3.sass','./src/assets/style/default4.sass'
        ,'./src/assets/style/default-all.sass','./src/assets/style/default-quick-book.sass'];

    gulp.src(cssFiles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths:'.compass/compass-mixins-master/lib'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/assets/style/'));
});

gulp.task("styles_prod", function(){

    gulp.src("./src/assets/style/fonts/*.*")
        .pipe(gulp.dest("./prod/assets/style/fonts/"));

    gulp.src(['./src/assets/style/default.sass', './src/assets/style/default2.sass','./src/assets/style/default3.sass','./src/assets/style/default4.sass'
            ,'./src/assets/style/default-all.sass','./src/assets/style/default-quick-book.sass'])
        .pipe(plumber())
        .pipe(sass({includePaths:'.compass/compass-mixins-master/lib'}))
        .pipe(minCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./prod/assets/style/'));
});

gulp.task("jade", function(){
    // re-compile just a single page -- good for fast re-compilation when debugging only a single page
    return gulp.src([sprintf('./src/page/%s.jade',specificRecompile.jade)])
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./build/'))
});


gulp.task("local", function(){
    return gulp.src(['./src/assets/local/**/*.*'])
        .pipe(gulp.dest('./build/assets/local'))
});

gulp.task("lib", function(){
    return gulp.src(['./src/assets/lib/**/*.*'])
        .pipe(gulp.dest('./build/assets/lib'))
});

gulp.task("lib_prod", function(){
    return gulp.src(['./src/assets/lib/**/*.*'])
        .pipe(gulp.dest('./prod/assets/lib'))
});

gulp.task("image", function(){
    return gulp.src(['./src/assets/img/**/*.*'])
        .pipe(gulp.dest('./build/assets/img'))
});

gulp.task("image_prod", function(){
    return gulp.src(['./src/assets/img/**/*.*'])
        .pipe(gulp.dest('./prod/assets/img'))
});

gulp.task("data", function(){
    return gulp.src(['./src/data/**/*.*'])
        .pipe(gulp.dest('./build/data/'))
});

gulp.task("svg", function() {
    return gulp.src(["./src/assets/img/flags/*.svg"])
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite/sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest("./build/assets/img/flags"));
});
gulp.task("svg_prod", function() {
    return gulp.src(["./src/assets/img/flags/*.svg"])
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite/sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest("./prod/assets/img/flags"));
});

gulp.task("watch", function(){
    //var proxy = require('proxy-middleware'), url = require('url');
    browserSync.init({
        files: "./build/**",
        reloadDelay: 200000,
        reloadDebounce: 5000,
        open: false,
        server: {
            baseDir: "./build",
            directory: true,
            //      middleware: [proxy(_.extend(url.parse('http://10.148.60.55/api'),{route:'/api'}))]
        },
        ui:{
            port:4000
        }


    });

    gulp.watch('./src/data/**/*', ['data']);
    gulp.watch('./src/config/**/*', ['bundle']);
    gulp.watch('./src/module/**/*', ['bundle']);
    // gulp.watch('./src/assets/style/**/*', ['styles']);
    gulp.watch('./src/page/**/*', ['jade']);

    watch('./src/assets/**/*.sass', function() {
        gulp.start('styles');
    });

});

gulp.task('quick-build-watch', ['bundle', 'styles', 'jade', 'watch']);
gulp.task('build', ['bundle', 'styles', 'jade', 'lib', 'local', 'image','data', 'svg']);
gulp.task('prod', ['bundle_prod', 'styles_prod', 'lib_prod', 'image_prod', 'svg_prod']);
gulp.task('dev', ['bundle_dev', 'styles_prod', 'lib_prod', 'image_prod', 'svg_prod']);
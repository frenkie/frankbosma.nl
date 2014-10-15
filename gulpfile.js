var gulp = require('gulp');

var del = require('del'),
    es = require('event-stream'),
    exec = require('child_process').exec,
    helpers = require('./lib/helpers'),
    plugins = require('gulp-load-plugins')();

var images = require('./lib/images');

/******************************
 * PATHS
 ******************************/

var basePath = {
    src: __dirname +'/src/',
    build: __dirname +'/build/'
};

var	path = {
    js: {
        src: basePath.src + 'js/',
        build: basePath.build + 'js/'
    },
    fonts: {
        src: basePath.src + 'fonts/',
        build: basePath.build + 'fonts/'
    },
    img: {
        src: basePath.src +'img/',
        build: basePath.build +'img/'
    },
    pages: {
        src: basePath.src +'pages-raw/',
        parsed: basePath.src + 'pages-parsed/',
        build: basePath.build
    },
    sass: {
        src: basePath.src + 'sass/',
        build: basePath.build + 'css/'
    },
    vendor : {
        src: './bower_components/',
        build: basePath.build +'vendor/'
    }
};

/******************************
 * BUILD SOURCES
 ******************************/

var jsSrc = [
    path.js.src +'prefix.js',
    path.js.src +'utilities.js',
    path.js.src +'lib/**/*',
    path.js.src +'main.js',
    path.js.src +'suffix.js'
];
var imgSrc = images.getImageSources( path.img.src, path.img.build );
var sassSrc = path.sass.src + 'fb.scss';
var vendorSrc = [
    path.vendor.src +'html5shiv/dist/html5shiv.min.js',
    path.vendor.src +'jquery/dist/jquery.min.js',
    path.vendor.src +'respond/dest/respond.min.js',
    path.vendor.src +'picturefill/dist/picturefill.min.js'
];


/******************************
 * TASKS
 ******************************/

gulp.task('clean', function (cb) {
    del([
        'build/*',
        '!build/{css,css/**,vendor,vendor/**,img,img/**,js,js/**,fonts,fonts/**,favicon\.ico}'
    ], cb);
});

gulp.task('favicon', function ( cb ) {

    gulp.src( basePath.src +'favicon.ico' )
        .pipe( gulp.dest( basePath.build ) )
        .on('end', cb);
});

gulp.task('fonts', function ( cb ) {

    gulp.src( path.fonts.src +'**' )
        .pipe( gulp.dest( path.fonts.build ) )
        .on('end', cb);
});

gulp.task('images', function ( cb ) {

    var imageTasks = [];

    imgSrc.forEach(function ( imgConfig ) {
        imageTasks.push( helpers.createImageTask( path, imgConfig ) );
    });

    del(['build/img'], function () {
        es.concat.apply(es, imageTasks)
                .on('end', cb);
    });
});

// Install prerequisites. Use npm install and bower install before gulp install
gulp.task('install', ['images','vendor', 'fonts', 'favicon', 'sass', 'scripts', 'pages']);


gulp.task('jekyll', function ( cb ) {

    exec('jekyll build', function ( err ) {
        if ( err ) {
            cb( err );
        } else {
            cb();
        }
    });
});

gulp.task('pages', ['clean', 'jekyll'], function ( cb ) {

    gulp.src( path.pages.parsed +'**' )
        .pipe( gulp.dest( path.pages.build ) )
        .on('end', cb);
});

// Concatenate & Minify SCSS
gulp.task('sass', function ( cb ) {
    gulp.src( sassSrc )
        .pipe( plugins.rubySass({ unixNewlines: true, precision: 4, noCache: true }) )
        .pipe( plugins.autoprefixer('last 2 version', '> 1%', 'ie 8', { cascade: true }) )
        .pipe( gulp.dest( path.sass.build ) )
        .pipe( plugins.rename({ suffix: '.min' }) )
        .pipe( plugins.minifyCss() )
        .pipe( gulp.dest( path.sass.build ) )
        .on('end', cb);
});

// Concatenate & Minify JS
gulp.task('scripts', function (cb) {

    es.concat(
        // Lint
        gulp.src( [
                path.js.src + 'utilities.js',
                path.js.src + 'main.js',
                path.js.src + 'lib/**/*'
            ] )
            .pipe( plugins.jshint() )
            .pipe( plugins.jshint.reporter('default') ),

        gulp.src( jsSrc )
            .pipe( plugins.concat('fb.js') )
            .pipe( gulp.dest( path.js.build ) )
            .pipe( plugins.rename({ suffix: '.min' }))
            .pipe( plugins.uglify({ preserveComments: 'some' }))
            .pipe( gulp.dest( path.js.build ) )
    ).on('end', cb);
});

gulp.task('serve', function ( cb ) {
    helpers.startExpress( basePath.build );
    cb();
});

// Move the vendor code from Bower's base to the build
gulp.task('vendor', function ( cb ) {
    gulp.src( vendorSrc )
        .pipe( gulp.dest( path.vendor.build ) )
        .on('end', cb);
});

gulp.task('watch', function () {

    helpers.startExpress( basePath.build );

    plugins.livereload.listen();

    // Watch for changes to our JS
    gulp.watch( path.js.src + '**/*.js', ['scripts']);

    // Watch for changes to our raw pages
    gulp.watch( path.pages.src +'**', ['pages']);

    // Watch for changes to our SASS
    gulp.watch( [
        path.sass.src + '*.scss',
        path.sass.src + 'components/*.scss',
        path.sass.src + 'generic/*.scss',
        path.sass.src + 'Responsive/src/sass/utilities/_variables.scss'
    ], ['sass'] );

    // Watch for changes in our build
    gulp.watch( basePath.build +'**')
        .on('change', helpers.notifyLivereload.bind( this, basePath, plugins.livereload ) );
});


// Default Task
gulp.task('default', ['install']);
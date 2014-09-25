var express = require('express');
var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');
var pathUtil = require('path');

exports.createImageTask = function ( paths, imgConfig ) {

    return gulp.src( imgConfig.src )
            .pipe( imageResize( imgConfig.buildOptions ) )
            .pipe( rename({
                basename: imgConfig.rename
            }) )
            .pipe( gulp.dest( imgConfig.dest || paths.img.build ) );
};

exports.notifyLivereload = function( basePath, livereload, event ) {

    // `gulp.watch()` events provide an absolute path
    // so we need to make it relative to the server root
    var fileName = pathUtil.relative( basePath.build, event.path );

    livereload.changed( fileName );
};

exports.startExpress = function( basePath ) {

    var app = express();

    app.use(express.static( basePath ));
    app.listen(4000);

    console.log('express server started on localhost:4000');
};
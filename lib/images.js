
function createThumbImage ( imgSrcPath, imgBuildPath, original, destinationName ) {

    var originalPath = imgSrcPath + original;

    return [
        {
            src: originalPath,
            buildOptions : {
                width : 80,
                height : 80
            },
            dest: imgBuildPath,
            rename: destinationName +'-thumb-s'
        },
        {
            src: originalPath,
            buildOptions : {
                width : 160,
                height : 160
            },
            dest: imgBuildPath,
            rename: destinationName +'-thumb-m'
        },
        {
            src: originalPath,
            buildOptions : {
                width : 320,
                height : 320
            },
            dest: imgBuildPath,
            rename: destinationName +'-thumb-l'
        }
    ];
}

function createNormalImage ( imgSrcPath, imgBuildPath, original, destinationName, widths ) {

    widths = widths || [ 240, 480, 640 ];
    
    var originalPath = imgSrcPath + original;

    return [
        {
            src: originalPath,
            buildOptions : {
                width : widths[0]
            },
            dest: imgBuildPath,
            rename: destinationName +'-s'
        },
        {
            src: originalPath,
            buildOptions : {
                width : widths[1]
            },
            dest: imgBuildPath,
            rename: destinationName +'-m'
        },
        {
            src: originalPath,
            buildOptions : {
                width : widths[2]
            },
            dest: imgBuildPath,
            rename: destinationName +'-l'
        }
    ];
}


exports.getImageSources = function ( imgSrcPath, imgBuildPath ) {

    var images = [
        {
            src: imgSrcPath +'frenkie.jpg',
            buildOptions : {
                width : 140,
                height : 140,
                crop : true
            },
            rename: 'frenkie-portret-s'
        },

        /* BACKGROUNDS */

        {
            src: imgSrcPath +'backgrounds/duke.jpg',
            buildOptions : {
                width : 1076
            },
            dest: imgBuildPath + 'backgrounds/',
            rename: 'duke-s'
        }
    ];

    /* THUMBS */
    images = images.concat(
        createThumbImage( imgSrcPath, imgBuildPath, 'vpro.gif', 'vpro' ),
        createThumbImage( imgSrcPath, imgBuildPath, 'frankbosma.gif', 'frankbosma' ),
        createThumbImage( imgSrcPath, imgBuildPath, 'figurerunning.gif', 'figurerunning' ),
        createThumbImage( imgSrcPath, imgBuildPath, 'arduino-tablesoccer.jpg', 'arduino-tablesoccer' ),
        createThumbImage( imgSrcPath, imgBuildPath, 'waverider.jpg', 'waverider' )
    );

    /* TEXT/IMAGE COMPONENTS */
    images = images.concat(
        createNormalImage( imgSrcPath +'projects/arduino/', imgBuildPath +'projects/arduino/',
                        'lcd.jpg', 'lcd' ),
        createNormalImage( imgSrcPath +'projects/arduino/', imgBuildPath +'projects/arduino/',
                        'lcd-case.jpg', 'lcd-case' ),
        createNormalImage( imgSrcPath +'projects/arduino/', imgBuildPath +'projects/arduino/',
                        'playfield.jpg', 'playfield' ),
        createNormalImage( imgSrcPath +'foosball/', imgBuildPath +'foosball/',
                        'anne-frank.jpg', 'anne-frank' ),
        createNormalImage( imgSrcPath +'projects/figurerunning/', imgBuildPath +'projects/figurerunning/',
                        'rose.jpg', 'rose' ),
        createNormalImage( imgSrcPath +'projects/waverider/', imgBuildPath +'projects/waverider/',
                        'waverider.jpg', 'waverider' ),
        createNormalImage( imgSrcPath +'projects/vpro/', imgBuildPath +'projects/vpro/',
                        'vpronl.jpg', 'vpronl' )
    );
    
    /* GRID IMAGE COMPONENTS */
    images = images.concat(
        createNormalImage( imgSrcPath +'tshirts/', imgBuildPath +'tshirts/',
                        'frank-foos.gif', 'frank-foos' ),
        createNormalImage( imgSrcPath +'tshirts/', imgBuildPath +'tshirts/',
                        'gijntje.gif', 'gijntje' ),
        createNormalImage( imgSrcPath +'tshirts/', imgBuildPath +'tshirts/',
                        'gorbi.gif', 'gorbi' ),
        createNormalImage( imgSrcPath +'tshirts/', imgBuildPath +'tshirts/',
                        'locohost.gif', 'locohost' )
    );    
    
    /* GALLERY IMAGE COMPONENTS */
    images = images.concat(
        createNormalImage( imgSrcPath +'illustrations/', imgBuildPath +'illustrations/',
                        'spoove.jpg', 'spoove' ),
        createNormalImage( imgSrcPath +'illustrations/', imgBuildPath +'illustrations/',
                        'angels.jpg', 'angels' ),
        createNormalImage( imgSrcPath +'illustrations/', imgBuildPath +'illustrations/',
                        'ape.jpg', 'ape' ),
        createNormalImage( imgSrcPath +'illustrations/', imgBuildPath +'illustrations/',
                        'skateboard.jpg', 'skateboard' ),
        createNormalImage( imgSrcPath +'illustrations/', imgBuildPath +'illustrations/',
                        'hijs.jpg', 'hijs' ),
        createNormalImage( imgSrcPath +'illustrations/', imgBuildPath +'illustrations/',
                        'nas.jpg', 'nas' )
    );        

    return images;
};
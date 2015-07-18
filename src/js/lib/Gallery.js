/**
 * Gallery uses the picturefill library for now to get easy access to the best image
 *
 * @param {HTMLElement} imageContainer
 * @param {Array} allowedImageClasses CSS class names to look for in the image container
 *                                    do not include the . (point)
 *
 * @requires window.picturefill
 * @requires window.PhotoSwipe
 * @constructor
 */
var Gallery = function ( imageContainer, allowedImageClasses ) {

    if ( document.querySelector('.pswp') ) {

        this._imageContainer = imageContainer;
        this._allowedImageClasses = allowedImageClasses;
        this._images = this._getImages();
    }
};

Gallery.prototype = {

    _create : function ( forImageIndex ) {

        this._gallery = new PhotoSwipe(
            document.querySelector('.pswp'),
            PhotoSwipeUI_Default,
            this._images
        );

        this._bindEvents();

        this._gallery.init();
        this._gallery.goTo( forImageIndex );
    },

    _bindEvents : function () {

        var realViewportWidth;
        var useLargeImages = false;
        var firstResize = true;
        var imageSrcWillChange;


        this._gallery.listen( 'beforeResize', function () {

            // calculate real pixels when size changes
            realViewportWidth = this._gallery.viewportSize.x * window.devicePixelRatio;

            // Find out if current images need to be changed
            if ( useLargeImages && realViewportWidth < 640 ) {
                useLargeImages = false;
                imageSrcWillChange = true;
            } else {
                if ( ! useLargeImages && realViewportWidth >= 640 ) {
                    useLargeImages = true;
                    imageSrcWillChange = true;
                }
            }

            // Invalidate items only when source is changed and when it's not the first update
            if ( imageSrcWillChange && !firstResize ) {
                // invalidateCurrItems sets a flag on slides that are in DOM,
                // which will force update of content (image) on window.resize.
                this._gallery.invalidateCurrItems();
            }

            if ( firstResize ) {
                firstResize = false;
            }

            imageSrcWillChange = false;

        }.bind( this ) );


        this._gallery.listen( 'gettingData', function ( index, item ) {


            if ( useLargeImages ) {
                item.src = item.l.src;
                item.w = item.l.w;
                item.h = item.l.h;
            } else {
                item.src = item.m.src;
                item.w = item.m.w;
                item.h = item.m.h;
            }
        } );

    },

    _getImages : function () {

        var galleryImages = [];
        var images = this._imageContainer.querySelectorAll( '.'+ this._allowedImageClasses.join(',.') );

        Array.prototype.forEach.call( images, function ( image, index ) {

            var ratio = image.width / image.height;
            var srcsets;
            var parsed = {};

            if ( image.getAttribute( 'srcset' ) ) {

                srcsets = image.getAttribute( 'srcset' ).replace( /[\r\n]/ig, '').split( /,[\s]+/ );

                srcsets.forEach( function ( srcset ) {

                    var specs = srcset.split( ' ' );
                    var srcWidth = parseFloat( specs[ 1 ].substr( 0, specs[ 1 ].length - 1  ) );
                    var srcSize = /-([^\.])\.[\w]{3}$/.exec( specs[0] );

                    if ( srcSize && srcSize.length >= 2 ) {
                        parsed[ srcSize[1] ] = {
                            src: specs[0],
                            w: srcWidth,
                            h: Math.floor( srcWidth / ratio )
                        };
                    }

                } );

                galleryImages.push( parsed );
            }

            image.addEventListener( 'click', function () {

                this._create( index );

            }.bind( this ));

        }.bind( this ));

        return galleryImages;
    }
};
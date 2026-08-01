import LazyLoad from 'react-lazy-load';
export const IMAGE_PATH_PREFIX = ( process.env.NEXT_PUBLIC_STATIC ) ? '/img/uploads/' : '/api/media/';

export function firstImage ( images, styles, lazyLoad){

    if ( images && images.length ) {
        const {hash, ext, width, formats} = images[0].image;
        const prefix = `_${hash}${ext}`;
        const sizes = '(min-width) 60vw, 100vw';

        const srcset = Object.keys(formats).filter(key => key !== 'thumb').map(formatName => {
            const format = formats[formatName];
            return `${IMAGE_PATH_PREFIX}${format.hash}${format.ext} ${format.width}w`;
        });

        if (!formats.large) {
            srcset.push(`${IMAGE_PATH_PREFIX}${hash}${ext} ${width}w`);
        }

        const img = <img className={styles.image} src={`${IMAGE_PATH_PREFIX}small${prefix}`} srcSet={srcset.join(', ')}
                         sizes={sizes}/>;

        return lazyLoad ? <LazyLoad
            debounce={false}
            offsetVertical={250}
        >{img}</LazyLoad> : img;
    }

}
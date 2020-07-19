import styles from './project.module.scss';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import LazyLoad from 'react-lazy-load';

const IMAGE_PATH_PREFIX = ( process.env.NEXT_PUBLIC_STATIC ) ? '/img/uploads/' : '/api/media/';

export default function Project ({ project }) {

    const { title, summary, shoutout, period, hyperlink, hyperlink_label, images, tags } = project;

    const firstImage = ( () => {

        if ( images && images.length ) {
            const { hash, ext, width, height, formats } = images[ 0 ].image;
            const prefix = `_${hash}${ext}`;
            const sizes = '(min-width) 60vw, 100vw';

            const srcset = Object.keys( formats ).filter( key => key !== 'thumb' ).map( formatName => {
                const format = formats[ formatName ];
                return `${IMAGE_PATH_PREFIX}${format.hash}${format.ext} ${format.width}w`;
            } );

            if ( ! formats.large ) {
                srcset.push( `${IMAGE_PATH_PREFIX}${hash}${ext} ${width}w` );
            }

            return  (
                <LazyLoad
                    debounce={false}
                    offsetVertical={250}
                >
                    <img className={styles.image} src={ `${IMAGE_PATH_PREFIX}small${prefix}` } srcSet={srcset.join(', ')} sizes={sizes} />
                </LazyLoad>
            );
        }

    })();

    const link = hyperlink ?  <a href={hyperlink} className={styles.link}><span className={styles['link-text']}>{ ( hyperlink_label ? hyperlink_label : 'go' ) }</span></a> : null ;
    const projPeriod = period ? <span className={styles.period}>{period}</span> : null;
    const shout = shoutout ? <p className={styles.shoutout}>{ shoutout }</p> : null;

    const tagList = ( () => {
        if ( tags && tags.length ) {
            const listItems = tags.map( tag => {
                return (<span key={tag.id} className={styles.tag}><span>{tag.name}</span><span className={styles['tag-divider']}>, </span></span>);
            } );

            return <dl className={styles['tag-list']}><dt>keywords</dt><dd>{ listItems }</dd></dl>
        }
    })();

    return (
        <div className={styles.project}>
            <Fade>
                <div className={styles.details}>
                    <h3 className={styles.title}>{title} {projPeriod}</h3>
                    {tagList}
                    <div className={styles.summary}><ReactMarkdown source={summary} /></div>
                    {shout}
                    {link}
                </div>
            </Fade>
            <Fade>
                <div className={styles.preview}>{ firstImage }</div>
            </Fade>
        </div>
    );
}
import styles from './project.module.scss';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import {firstImage} from "../includes/libs/images";

export default function Project ({ project }) {

    const { title, summary, shoutout, period, hyperlink, hyperlink_label, images, tags } = project;


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
                <div className={styles.preview}>{ firstImage(images, styles, true) }</div>
            </Fade>
        </div>
    );
}
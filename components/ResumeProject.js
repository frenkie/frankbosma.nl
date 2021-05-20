import styles from './resumeProject.module.scss';
import ReactMarkdown from 'react-markdown';

export default function ResumeProject ({ project }) {

    const { title, job, resume, shoutout, period, hyperlink, hyperlink_label, tags, cv_page_break } = project;
    const link = hyperlink ?  <a href={hyperlink} className={styles.link}><span className={styles['link-text']}>{ ( hyperlink_label ? hyperlink_label : 'go' ) }</span></a> : null ;
    const projPeriod = period ? <span className={styles.period}>{period}</span> : null;
    const shout = shoutout ? <p className={styles.shoutout}>{ shoutout }</p> : null;
    const jobTitle = job ? <p className={styles.job}>{ job }</p> : null;

    const tagList = ( () => {
        if ( tags && tags.length ) {
            const listItems = tags.map( tag => {
                return (<span key={tag.id} className={styles.tag}><span>{tag.name}</span><span className={styles['tag-divider']}>, </span></span>);
            } );

            return <dl className={styles['tag-list']}><dt>keywords</dt><dd>{ listItems }</dd></dl>
        }
    })();

    return (
        <div>
            <div className={styles.project} id={title.toLowerCase().replace(/[\s\.]/ig, '-')}>
                <h3 className={styles.title}>{title} {projPeriod}</h3>
                {jobTitle}
                {shout}
                {tagList}
                <div className={styles.summary}><ReactMarkdown source={resume} /></div>
                {link}
            </div>
            {cv_page_break && <div className="page-break"></div>}
        </div>
    );
}
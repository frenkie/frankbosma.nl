import styles from './contact.module.scss';
import classnames from 'classnames';
import ReactMarkdown from "react-markdown";


export default function Contact ({ description }) {

    const contactPoints = [
        { link : 'https://github.com/frenkie', label: 'github', iconClassName: 'github' },
        { link : 'https://linkedin.com/frenkie', label: 'linkedin', iconClassName: 'linkedin' },
        { link : 'https://facebook.com/frenkie', label: 'facebook', iconClassName: 'facebook' },
    ].map( contactItem => {

        const { link, label, iconClassName } =  contactItem;

        return (
            <a key={link} href={link} className={styles.social__link}><i className={ classnames( styles.icon, 'icon--'+ iconClassName, styles['icon--'+ iconClassName] ) } /> { label }</a>
        );
    } );

    return (
        <div className={styles.container} id="contact">
            <h2 className={styles.title}>Contact <span className={styles.title__icon}>👋</span></h2>
            <ReactMarkdown source={description} />
            <div className={styles.social}>
            { contactPoints }
            </div>
        </div>
    );
}
import Head from 'next/head';
import Contact  from '../components/Contact.js';
import ResumeProject from '../components/ResumeProject.js';
import ReactMarkdown from 'react-markdown';
import styles from './resume.module.scss';

const IMAGE_PATH_PREFIX = ( process.env.NEXT_PUBLIC_STATIC ) ? '/img/uploads/' : '/api/media/';

/**
 * Renders a simple PDF-able Resume page
 * @param resume
 * @returns {JSX.Element}
 * @constructor
 */
export default function Resume({ resume }) {

    const { hash, ext } = resume.profile;
    const profilePrefix = `_${hash}${ext}`;

    return (
        <div>
            <Head>
                <title>Frank Bosma - Creative developer from Amsterdam - 🚀 frankbosma.nl</title>
                <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:700|Lora" rel="stylesheet" type="text/css" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.sidebar}>
                    <section className={styles.profile}>
                        <img src={`${IMAGE_PATH_PREFIX}medium${profilePrefix}`} className={styles.profile__picture} />
                        <div className={styles['profile__meta']}>
                            <span className={styles['full-name']}>{resume.full_name}</span><br />
                            <span className={styles.role}>{resume.role}</span>
                        </div>
                        <div className={styles['profile__meta']}>
                            <span className={styles.data}>{resume.phone}</span><br />
                            <span className={styles.data}>{resume.email}</span><br />
                            <span className={styles.data}>{resume.birth_date.split('-').reverse().join('-')}</span>
                        </div>
                    </section>
                    <section className={styles.social}>
                        <h3 className={`${styles['section-title']} ${styles['section-title--sidebar']}`}><pre>Socials           </pre></h3>
                        <ul className={styles['social-links']}>
                        {
                            resume.social.map( (s,i) => (
                                <li key={i} className={styles['social-link']}>
                                    <span className={styles['social-link__label']}>{s.label}</span><br />
                                    <a href={s.hyperlink} className={styles['social-link__hyperlink']}>{s.hyperlink}</a>
                                </li>
                            ))
                        }
                        </ul>
                    </section>
                    <section className={styles.skills}>
                        <h3 className={`${styles['section-title']} ${styles['section-title--sidebar']}`}><pre>Skills            </pre></h3>
                        <ReactMarkdown source={resume.skills} />
                    </section>
                    <section className={styles.education}>
                        <h3 className={`${styles['section-title']} ${styles['section-title--sidebar']}`}><pre>Education         </pre></h3>
                        <ul className={styles.education__list}>
                        {
                            resume.education.map( (e,i) => (
                                <li key={i} className={styles['education__list-item']}>
                                    <div className={styles.education__period}>{e.period}</div>
                                    <div className={styles.education__title}>{e.title}</div>
                                    <div>{e.school}</div>
                                </li>
                            ))
                        }
                        </ul>
                    </section>
                    <section className={styles['spare-time']}>
                        <h3 className={`${styles['section-title']} ${styles['section-title--sidebar']}`}><pre>Also              </pre></h3>
                        <ReactMarkdown source={resume.spare_time} />
                    </section>
                </div>
                <div className={styles['track-record']}>
                    <section className={styles['about-me']}>
                        <h1 className={styles['section-title']}>About me</h1>
                        <div>
                            <ReactMarkdown source={resume.about_me} />
                        </div>
                    </section>
                    <section>
                        <h2 className={`${styles['section-title']} ${styles['section-title--experience']}`}>Experience</h2>
                        <div>
                            {resume.experience.map( projectData =>
                                <ResumeProject project={projectData.project} key={projectData.project.id} />
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export async function getStaticProps() {

    let res;

    if ( process.env.NEXT_PUBLIC_STATIC ) {
        res = await fetch( process.env.LOCAL_ENDPOINT + process.env.NEXT_PUBLIC_DATA_PATH_RESUME );
    } else {
        res = await fetch( process.env.LOCAL_ENDPOINT + '/api/resume' );
    }

    const resumeData = await res.json();

    return {
        props: {
            resume: resumeData.resume
        },
    }
}
import Head from 'next/head';
import Contact  from '../components/Contact.js';
import Projects from '../components/Projects.js';
import ReactMarkdown from 'react-markdown';
import styles from './index.module.scss';

export default function Home({ intro, projects, contact }) {

    return (
        <div>
            <Head>
                <title>Frank Bosma - Creative developer from Amsterdam - 🚀 frankbosma.nl</title>
                <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:700|Lora" rel="stylesheet" type="text/css" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <header className={styles.header}>
                    <img className={styles.header__image} src="/img/frenkie-portret-s.jpg" />
                    <h1 className={styles.header__title}>Frank Bosma</h1>
                </header>

                <div className={styles.intro}>
                    <ReactMarkdown source={intro.description} />
                </div>
            </main>

            <Projects intro={projects.text} projects={projects.projects} />

            <footer className={styles.footer}>
                <Contact description={contact.description} />
            </footer>
        </div>
    )
}

export async function getStaticProps() {

    let res;

    if ( process.env.NEXT_PUBLIC_STATIC ) {
        res = await fetch( process.env.LOCAL_ENDPOINT + process.env.NEXT_PUBLIC_DATA_PATH );
    } else {
        res = await fetch( process.env.LOCAL_ENDPOINT + '/api/home' );
    }

    const homePageData = await res.json();

    return {
        props: {
            intro: homePageData.intro,
            projects: homePageData.developer,
            contact: homePageData.contact
        },
    }
}
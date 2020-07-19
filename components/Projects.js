import styles from './projects.module.scss';
import Project from './Project.js';
import ReactMarkdown from 'react-markdown';

export default function Projects ({ intro, projects }) {

    const projectListing = projects.map( projectData =>
        <Project project={projectData.project} key={projectData.project.id} />
    );

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Projects</h2>
                <ReactMarkdown source={intro} />
            </div>
           {
               projectListing
           }
        </section>
    );
}
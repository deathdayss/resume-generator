import localization, { languageManager } from "@/data/localization";
import styles from './index.module.scss';

const projectLink = "https://github.com/deathdayss/resume-generator"

const Footer = () => {
    const footerLocal = localization[languageManager.langCode].footer;
    console.log('render footer')
    return (
        <div className={styles.footer}>
            <a href={projectLink}>{footerLocal.devLink}</a>
        </div>
    )
}

export default Footer;
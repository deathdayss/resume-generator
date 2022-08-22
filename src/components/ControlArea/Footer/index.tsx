import localization, { LanguageContext } from "@/data/localization";
import { useContext } from "react";
import styles from './index.module.scss';

const projectLink = "https://github.com/deathdayss/resume-generator"

const Footer = () => {
    const langCode = useContext(LanguageContext);
    const footerLocal = localization[langCode].footer;

    return (
        <div className={styles.footer}>
            <a href={projectLink}>{footerLocal.githubAddress}</a>
        </div>
    )
}

export default Footer;
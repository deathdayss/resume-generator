import localization, { LanguageContext } from "@/data/localization";
import { Detail } from "@/data/resumeData"
import { Text } from "@react-pdf/renderer";
import { useContext, useMemo } from "react";
import { SectionProps } from "../common/type";
import Section from "../components/Section"

interface DetailSectionProps extends SectionProps {
    detail: Detail
}

const DetailSection = ({ detail, templateId, last = false }: DetailSectionProps) => {
    const langCode = useContext(LanguageContext);

    const detailLocal = localization[langCode].document.detail;
    const emailPhoneText = useMemo(() => {
        const emailText = detail.email ? detail.email : detailLocal.yourEmail;
        const phoneText = detail.phone ? detail.phone : detailLocal.yourPhone;
        if (detail.email !== undefined && detail.phone === undefined) {
            return emailText;
        }
        else if (detail.email === undefined && detail.phone !== undefined) {
            return phoneText;
        }
        else if (detail.email !== undefined && detail.phone !== undefined) {
            return `${emailText} | ${phoneText}`
        }
        else {
            return '';
        }
    }, [detail.email, detail.phone, detailLocal.yourEmail, detailLocal.yourPhone]);

    return <Section title={detail.personName ? detail.personName : detailLocal.yourName} last={last}>
        {detail.visa === undefined ? null : <Text>{detail.visa ? detail.visa : detailLocal.yourVisa}</Text>}
        {emailPhoneText ? <Text>{emailPhoneText}</Text> : null}
    </Section>
}

export default DetailSection;
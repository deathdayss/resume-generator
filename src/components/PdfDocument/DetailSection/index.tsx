import { Detail } from "@/data/docData";
import localization, { languageManager } from "@/data/localization";
import { Text } from "@react-pdf/renderer";
import { observer } from "mobx-react-lite";
import { SectionProps } from "../common/type";
import Section from "../components/Section";

interface DetailSectionProps extends SectionProps {
    detail: Detail
}

const getEmailPhoneText = (detail: Detail, detailLocal: any) => {
    const emailText = detail.email ? detail.email : detailLocal.yourEmail;
    const phoneText = detail.phone ? detail.phone : detailLocal.yourPhone;
    if (detail.email !== null && detail.phone === null) {
        return emailText;
    }
    else if (detail.email === null && detail.phone !== null) {
        return phoneText;
    }
    else if (detail.email !== null && detail.phone !== null) {
        return `${emailText} | ${phoneText}`
    }
    return ''
}

const DetailSection = ({ detail, templateId, last = false }: DetailSectionProps) => {
    const detailLocal = localization[languageManager.langCode].document.detail;
    const emailPhoneText = getEmailPhoneText(detail, detailLocal);

    return <Section title={detail.personName ? detail.personName : detailLocal.yourName} last={last}>
        {detail.visa === null ? null : <Text>{detail.visa ? detail.visa : detailLocal.yourVisa}</Text>}
        {emailPhoneText ? <Text>{emailPhoneText}</Text> : null}
    </Section>
}

export default observer(DetailSection);
import localization, { LanguageContext } from "@/data/localization";
import { Detail } from "@/data/resumeData"
import { Text } from "@react-pdf/renderer";
import { useContext } from "react";
import { LastProps } from "../common/type";
import Section from "../components/Section"

interface DetailSectionProps extends LastProps {
    detail: Detail
}

const DetailSection = ({ detail, last = false }: DetailSectionProps) => {
    const langCode = useContext(LanguageContext);
    if (!detail) {
        return null;
    }
    const detailLocal = localization[langCode].document.detail;
    return <Section title={detail.personName ? detail.personName : detailLocal.yourName} last={last}>
        <Text>{detail.visa ? detail.visa : detailLocal.yourVisa}</Text>
        <Text>{detail.email ? detail.email : detailLocal.yourEmail} | {detail.phone ? detail.phone : detailLocal.yourPhone}</Text>
    </Section>
}

export default DetailSection;
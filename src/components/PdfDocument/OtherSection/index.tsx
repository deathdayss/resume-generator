import localization, { LanguageContext } from "@/data/localization";
import { OtherInfo } from "@/data/resumeData"
import { Text } from "@react-pdf/renderer";
import { useContext } from "react";
import { LastProps } from "../common/type";
import Section from "../components/Section"

interface OtherSectionProps extends LastProps {
    other: OtherInfo | undefined
}

const OtherSection = ({ other, last = false }: OtherSectionProps) => {
    const langCode = useContext(LanguageContext);
    if (other === undefined) {
        return null;
    }
    const { title, comment } = other;
    return <Section title={title ? title : localization[langCode].document.other.title} last={last}>
        <Text>{comment ? comment : localization[langCode].document.common.yourComment}</Text>
    </Section>
}

export default OtherSection;
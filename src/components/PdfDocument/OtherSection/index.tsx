import localization, { LanguageContext } from "@/data/localization";
import { OtherInfo } from "@/data/resumeData"
import { Link, Text } from "@react-pdf/renderer";
import { useContext } from "react";
import { SectionProps } from "../common/type";
import Section from "../components/Section"
import TextLink from "../components/TextLink";

interface OtherSectionProps extends SectionProps {
    other: OtherInfo | undefined
}

const OtherSection = ({ other, templateId, last = false }: OtherSectionProps) => {
    const langCode = useContext(LanguageContext);
    if (other === undefined) {
        return null;
    }
    const { title, description } = other;
    return <Section title={title ? title : localization[langCode].document.other.title} last={last}>
        <Text>{description ? <TextLink text={description} /> : localization[langCode].document.common.yourDescription}</Text>
    </Section>
}

export default OtherSection;
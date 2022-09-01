// import { OtherInfo } from "@/data/docData";
import { Other } from "@/data/docData";
import localization, { languageManager } from "@/data/localization";
import { Text } from "@react-pdf/renderer";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { SectionProps } from "../common/type";
import Section from "../components/Section";
import TextLink from "../components/TextLink";

interface OtherSectionProps extends SectionProps {
    other: Other
}

const OtherSection = ({ other, templateId, last = false }: OtherSectionProps) => {
    const { title, description } = other;
    const documentLocal = localization[languageManager.langCode].document;
    return <Section title={title ? title : documentLocal.other.title} last={last}>
        <Text>{description ? <TextLink text={description} /> : documentLocal.common.yourDescription}</Text>
    </Section>
}

export default observer(OtherSection);
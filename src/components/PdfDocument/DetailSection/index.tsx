import { Detail } from "@/data/resumeData"
import { Text } from "@react-pdf/renderer";
import Section from "../components/Section"

interface DetailSectionProps {
    detail: Detail
}

const DetailSection = ({ detail }: DetailSectionProps) => {
    return <Section title={detail.personName}>
        <Text>{detail.email} | {detail.phone}</Text>
    </Section>
}

export default DetailSection;
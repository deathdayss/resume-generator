// import { Detail, DocFormDataContext, EducationInfo, ExperienceInfo, OtherInfo, SkillInfo } from '@/data/docData';
import { Detail, EducationInfo, ExperienceInfo, Other, sectionInfos, SkillInfo } from '@/data/docData';
import { docStylesManager } from '@/data/docStyles';
import { specialFonts } from '@/fonts';
import { Document, Page } from '@react-pdf/renderer';
import { observer } from 'mobx-react-lite';
import { useContext, useMemo } from 'react';
import DetailSection from './DetailSection';
// import { DocStylesContext, stableDocStyles } from './docStyles';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import OtherSection from './OtherSection';
import SkillSection from './SkillSection';


const PdfDocument = () => {
    return <Document title={sectionInfos.title}>
        <Page size="A4" style={docStylesManager.docStyles.page}>
            {sectionInfos.arr.map((sectionInfo, index) => {
                const last = index === sectionInfos.arr.length - 1;
                const { id, textData, templateId } = sectionInfo;
                const commonProps = { key: id, last, templateId };
                switch (id) {
                    case 'Detail':
                        return <DetailSection {...commonProps} detail={textData as Detail} />;
                    case 'Experience':
                        return <ExperienceSection {...commonProps} experience={textData as ExperienceInfo} />
                    case 'Education':
                        return <EducationSection {...commonProps} education={textData as EducationInfo} />;
                    case 'Skill':
                        return <SkillSection {...commonProps} skill={textData as SkillInfo} />;
                    case 'Other':
                        return <OtherSection {...commonProps} other={textData as Other} />;
                    default:
                        throw new Error('invalid section id')
                }
            })}
        </Page>
    </Document >
};

export default observer(PdfDocument);
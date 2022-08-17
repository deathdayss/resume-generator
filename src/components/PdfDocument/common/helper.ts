import localization, { Language } from "@/data/localization";
import { Period } from "@/data/resumeData";

export const getPeriodText = (langCode: Language, period: Period) => {
    const commonLocal = localization[langCode].document.common;
    let startDate = commonLocal.startDate;
    let endDate = commonLocal.endDate;
    if (period[0]) {
        startDate = period[0];
    }
    if (period[1]) {
        endDate = period[1];
    }
    return `${startDate} - ${endDate}`;
}
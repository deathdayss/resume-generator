import { Font } from "@react-pdf/renderer";
import Arial from './Arial.ttf';
import ArialBold from './Arial-bold.ttf';
import TimesNewRoman from './Times-new-roman.ttf';
import TimesNewRomanBold from './Times-new-roman-bold.ttf';
import DengdXian from './Deng-xian.ttf';
import DengXianBold from './Deng-xian-bold.ttf';

Font.register({
    family: 'Arial',
    fonts: [
        { src: Arial },
        { src: ArialBold, fontWeight: 'bold' }
    ]
})

Font.register({
    family: 'Deng-xian',
    fonts: [
        { src: DengdXian },
        { src: DengXianBold, fontWeight: 'bold' }
    ]
})

Font.register({
    family: 'Times-new-roman',
    fonts: [
        { src: TimesNewRoman },
        { src: TimesNewRomanBold, fontWeight: 'bold' }
    ]
})

export const chiFonts = ['Deng-xian'];

const fontFamily = ['Arial', 'Deng-xian', 'Times-new-roman']

export default fontFamily;
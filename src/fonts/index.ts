import { Font } from "@react-pdf/renderer";
import Bulter from './Butler.otf';
import BulterBold from './Butler-bold.otf'
import AlibabaPuHuTi from './Alibaba-PuHuiTi.ttf';
import AlibabaPuHuTiBold from './Alibaba-PuHuiTi-bold.ttf';

Font.register({
    family: 'Bulter',
    fonts: [
        { src: Bulter },
        { src: BulterBold, fontWeight: 'bold' }
    ]
})


Font.register({
    family: 'Alibaba-PuHuTi',
    fonts: [
        { src: AlibabaPuHuTi },
        { src: AlibabaPuHuTiBold, fontWeight: 'bold' }
    ]
})

export const chiFonts = ['Alibaba-PuHuT'];
export const specialFonts = ['Courier', 'Helvetica', 'Times-Roman']
const globalFontFamily = {
    'Helvetica': 'Helvetica',
    'Times-Roman': 'Times Roman',
    'Bulter': 'Bulter',
    'Courier': 'Courier',
    'Alibaba-PuHuTi': '阿里巴巴普惠体',
}

export default globalFontFamily;
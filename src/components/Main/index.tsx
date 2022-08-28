// import { changePropsValue, getPdfTitle } from '@/components/helper/helper';
// import { DocFormDataContext, initialSectionInfos } from '@/data/docData';
import { SectionData } from '@/data/docData';
import { Language, languageManager } from '@/data/localization';
import { chiFonts } from '@/fonts';
import { usePDF } from '@react-pdf/renderer';
import { action, autorun, makeAutoObservable, makeObservable, observable, reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { initialSectionForms } from '../../data/formData';
import ControlArea from '../ControlArea';
import Footer from '../ControlArea/Footer';
import PdfDocument from '../PdfDocument';
import { docStylesManager, DocStyles, initialStylesData } from '../PdfDocument/docStyles';
// import { DocStyles, initialDocStyles, initialFormStyles } from '../PdfDocument/docStyles';
import PdfViewArea from '../PdfViewArea';
import useStateRef from '../Resizable/hooks/useStateRef';
import styles from './index.module.scss';

class ArrayElement {
    text1 = 'first'
    text2 = 'first2'
    constructor() {
        makeAutoObservable(this);
    }

    changeFisrt() {
        this.text1 += '0';
    }

    changeSecond() {
        this.text2 += '1';
    }
}

const myArr = [{ a: { text: 'second' } }, { a: { text: 'second' } }];

class ArrayTest {
    @observable k = myArr;

    constructor() {
        makeObservable(this);
    }

    @action
    setArray(arr: any) {
        this.k = arr;
    }

    @action
    changeFisrt() {
        console.log('changeFisrt')
        // this.k[0].a.text += '0';
    }

    @action
    changeSecond() {
        console.log('changeSecond')
        console.log('before', this.k[1].a.text)
        this.k[1].a.text += '0';
        console.log('after', this.k[1].a.text)
        this.k[1].a.text += '0';
        console.log('after after', this.k[1].a.text)
    }

    @action
    swapIndex() {
        const first = this.k[0];
        this.k[0] = this.k[1];
        this.k[1] = first;
    }
}

const array = new ArrayTest();

const Test0 = observer(() => {
    console.log('render Test0')
    useEffect(() => {
        // reaction(() => docStyles.docStyles, () => {
        //     console.log('docStyles docStyles change')
        // })
        autorun(() => {
            console.log(docStylesManager.docStyles);
            console.log('autorun on docStyles.docStyles')
        })
    }, [])
    return <div>
        <button onClick={() => docStylesManager.setPadding('padding')}>change first</button>
        {/* <div>{(array.k[0] as ArrayElement).text2}</div> */}
        <div>{JSON.stringify(docStylesManager.docStyles)}</div>
        {/* {array.k.map((elem, index) => <div>array element</div>)} */}
    </div>
})

const Main = () => {
    // const [langCode, setLangCode] = useState<Language>('eng');
    // const [sectionInfos, setSectionInfos] = useState(initialSectionInfos);
    // const [sectionForms, setSectionForms] = useState(initialSectionForms)
    // const [styleArgs, setStylesArgs] = useState(initialDocStyles);
    // const [formStyleArgs, setFormStyleArgs] = useState(initialFormStyles);
    // const title = useMemo(() => getPdfTitle(sectionInfos, langCode), [langCode, sectionInfos]);
    // const DocFormDataContextValue = useMemo(() => ({
    //     sectionForms, setSectionForms, sectionInfos, setSectionInfos, styleArgs, setStylesArgs, formStyleArgs, setFormStyleArgs, title
    // }), [formStyleArgs, sectionForms, sectionInfos, styleArgs, title])
    const [instanceDoc, updateDoc] = usePDF({
        document: <PdfDocument />
    });
    // useEffect(() => {
    //     const storeLangCode = localStorage.getItem('resumeLangCode');
    //     if (storeLangCode) {
    //         setLangCode(storeLangCode as Language);
    //     }
    // }, []);
    // useEffect(() => {
    //     if (langCode === 'chi' && !chiFonts.includes(styleArgs.page.fontFamily)) {
    //         setFormStyleArgs(changePropsValue(formStyleArgs, { page: { fontFamily: 'Alibaba-PuHuTi' } }) as DocStyles);
    //         setStylesArgs(changePropsValue(formStyleArgs, { page: { fontFamily: 'Alibaba-PuHuTi' } }) as DocStyles);
    //     }
    // }, [langCode]);
    // useEffect(() => {
    //     updateDoc();
    // }, [sectionInfos, styleArgs]);
    // console.log('render Main')
    return (
        <div className={styles.main}>
            <Test0 />
            <PdfViewArea src={instanceDoc.url} />
            {/* <div className={styles.rightFlexItem}>
                <ControlArea instanceDoc={instanceDoc} />
                <Footer />
            </div> */}
        </div>
    )
}

export default Main;
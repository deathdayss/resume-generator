import { sectionInfos } from '@/data/docData';
import { usePDF } from '@react-pdf/renderer';
import { action, autorun, computed, makeAutoObservable, makeObservable, observable, reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { docStylesManager } from '../../data/docStyles';
import ControlArea from '../ControlArea';
import Footer from '../ControlArea/Footer';
import PdfDocument from '../PdfDocument';
import PdfViewArea from '../PdfViewArea';
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

class Timer {
    count;
    constructor() {
        makeObservable(this);
        this.count = 0;
    }

    @action
    addTime() {
        console.log('addTime()')
        this.count++;
    }
}

const timer = new Timer();

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

    @computed
    get time() {
        console.log('re compute in getTime()')
        return timer.count;
    }
}

const array = new ArrayTest();

const Test0 = observer(() => {
    console.log('render Test0')
    useEffect(() => {
        autorun(() => {
            console.log(docStylesManager.docStyles);
            console.log('autorun on docStyles.docStyles')
        })
    }, [])
    return <div>
        <button onClick={() => timer.addTime()}>change first</button>
        <div>{array.time}</div>
        {/* <div>{(array.k[0] as ArrayElement).text2}</div> */}
        <div>{JSON.stringify(docStylesManager.docStyles)}</div>
        {/* {array.k.map((elem, index) => <div>array element</div>)} */}
    </div>
})

const Main = () => {
    const [instanceDoc, updateDoc] = usePDF({
        document: <PdfDocument />
    });
    // useEffect(() => {
    //     const sectionInfosDispose = reaction(() => sectionInfos.arr, () => {
    //         console.log('sectionInfosDispose')
    //         updateDoc();
    //     });
    //     const docStylesDispose = reaction(() => docStylesManager.docStyles, () => {
    //         console.log('docStylesDispose')
    //         updateDoc();
    //     })
    //     return () => {
    //         sectionInfosDispose();
    //         docStylesDispose();
    //     }
    // }, [])
    return (
        <div className={styles.main}>
            {/* <Test0 /> */}
            <PdfViewArea src={instanceDoc.url} />
            <div className={styles.rightFlexItem}>
                <ControlArea instanceDoc={instanceDoc} />
                <Footer />
            </div>
        </div>
    )
}

export default Main;
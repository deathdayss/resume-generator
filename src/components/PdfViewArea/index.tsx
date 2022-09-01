import { PdfViewOpen, resizableState } from '@/data/mobData';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef, useState } from 'react';
import Resizable, { ResizableProps } from '../Resizable';
import styles from './index.module.scss';

interface PdfViewAreaProps {
    src: string | null
}

type GetSizeProps = {
    getWidth: () => number;
} & ResizableProps

const GetSize = observer(({ getWidth, ...leftProps }: GetSizeProps) => <Resizable size={{ width: getWidth() }} {...leftProps} />)

const PdfViewArea = ({ src }: PdfViewAreaProps) => {
    const [widthRange, setWidthRange] = useState({ minWidth: window.innerWidth / 4, maxWidth: window.innerWidth * 0.65 });
    const resizableContainerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const setIframePointerEvent = useCallback((state: string) => {
        if (iframeRef && iframeRef.current) {
            iframeRef.current.style.pointerEvents = state;
        }
    }, []);
    console.log('render pdfViewArea')
    useEffect(() => {
        const windowResizeHanlde = () => {
            const minWidth = window.innerWidth / 4;
            const maxWidth = window.innerWidth * 0.65;
            setWidthRange({ minWidth, maxWidth });
            const resizableContainer = resizableContainerRef.current?.children[0];
            if (resizableContainer) {
                let containerWidth = Math.max(resizableContainer.clientWidth, minWidth);
                containerWidth = Math.min(resizableContainer.clientWidth, maxWidth);
                resizableState.setWidth = containerWidth;
            }
        }
        const mouseDownHandle = () => setIframePointerEvent('none');
        const mouseUpHandle = () => setIframePointerEvent('auto');
        window.addEventListener('resize', windowResizeHanlde);
        window.addEventListener('mousedown', mouseDownHandle);
        window.addEventListener('mouseup', mouseUpHandle);
        return () => {
            window.removeEventListener('resize', windowResizeHanlde);
            window.removeEventListener('mousedown', mouseDownHandle);
            window.removeEventListener('mouseup', mouseUpHandle);
        }
    }, []);
    if (!PdfViewOpen.state) {
        return null;
    }
    return <div ref={resizableContainerRef} className={styles.PdfViewContainer}>
        <GetSize
            sideClassName={styles.resizableSide}
            minSize={{ width: widthRange.minWidth }}
            maxSize={{ width: widthRange.maxWidth }}
            getWidth={() => resizableState.width}
            onResizeStart={(_e, _d, _realLength, nextLength) => {
                setIframePointerEvent('none');
                resizableState.setUseDragging = true;
                resizableState.setWidth = Number(nextLength);
            }}
            onResize={(_e, _d, _realLength, nextLength) => {
                resizableState.setWidth = Number(nextLength);
            }}
            onResizeEnd={() => {
                setIframePointerEvent('auto');
                const resizableContainer = resizableContainerRef.current?.children[0];
                if (resizableContainer) {
                    resizableState.setWidth = resizableContainer.clientWidth;
                }
            }} className={styles.resizable} disabledDirection={['Top', 'Bottom', 'Left']} >
            <div ref={iframeRef} className={styles.pdfView}>
                <iframe width='100%' height='100%' title="resume-doc" src={src ? src : undefined} />
            </div>
        </GetSize >
    </div>
}

export default observer(PdfViewArea);
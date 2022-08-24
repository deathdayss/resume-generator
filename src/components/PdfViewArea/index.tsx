import { useCallback, useEffect, useRef, useState } from 'react';
import Resizable from '../Resizable';
import styles from './index.module.scss';

export interface ResizableState {
    useDragging: boolean,
    width: number
}

export interface ResizableStateRef {
    current: ResizableState
}

interface PdfViewAreaProps {
    src: string | null
    resizableStateRef: ResizableStateRef,
    setResizableStateRef: (arg: ResizableState) => void
}

const PdfViewArea = ({ src, resizableStateRef, setResizableStateRef }: PdfViewAreaProps) => {
    const [widthRange, setWidthRange] = useState({ minWidth: window.innerWidth / 4, maxWidth: window.innerWidth * 0.65 });
    const resizableContainerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const setIframePointerEvent = useCallback((state: string) => {
        if (iframeRef && iframeRef.current) {
            iframeRef.current.style.pointerEvents = state;
        }
    }, []);
    useEffect(() => {
        const windowResizeHanlde = () => {
            const minWidth = window.innerWidth / 4;
            const maxWidth = window.innerWidth * 0.65;
            setWidthRange({ minWidth, maxWidth });
            const resizableContainer = resizableContainerRef.current?.children[0];
            if (resizableContainer) {
                let containerWidth = Math.max(resizableContainer.clientWidth, minWidth);
                containerWidth = Math.min(resizableContainer.clientWidth, maxWidth);
                setResizableStateRef({
                    useDragging: resizableStateRef.current.useDragging,
                    width: containerWidth
                })
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
    return <div ref={resizableContainerRef} className={styles.PdfViewContainer}>
        <Resizable
            sideClassName={styles.resizableSide}
            minSize={{ width: widthRange.minWidth }}
            maxSize={{ width: widthRange.maxWidth }}
            size={{ width: resizableStateRef.current.width }}
            onResizeStart={(_e, _d, _realLength, nextLength) => {
                setIframePointerEvent('none');
                setResizableStateRef({
                    useDragging: true,
                    width: nextLength as number
                })
            }}
            onResize={(_e, _d, _realLength, nextLength) => {
                setResizableStateRef({
                    useDragging: resizableStateRef.current.useDragging,
                    width: nextLength as number
                })
            }}
            onResizeEnd={() => {
                setIframePointerEvent('auto');
                const resizableContainer = resizableContainerRef.current?.children[0];
                if (resizableContainer) {
                    setResizableStateRef({
                        useDragging: resizableStateRef.current.useDragging,
                        width: resizableContainer.clientWidth
                    })
                }
            }} className={styles.resizable} disabledDirection={['Top', 'Bottom', 'Left']} >
            <div ref={iframeRef} className={styles.pdfView}>
                <iframe width='100%' height='100%' title="resume-doc" src={src ? src : undefined} />
            </div>
        </Resizable >
    </div>
}

export default PdfViewArea;
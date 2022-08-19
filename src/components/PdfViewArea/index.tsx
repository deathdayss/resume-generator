import { useEffect, useRef, useState } from 'react';
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
    const [widthRange, setWidthRange] = useState({ minWidth: window.innerWidth / 4, maxWidth: window.innerWidth * 3 / 4 });
    const resizableContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const windowResizeHanlde = () => {
            const minWidth = window.innerWidth / 4;
            const maxWidth = minWidth * 3;
            setWidthRange({ minWidth, maxWidth });
            const resizableContainer = resizableContainerRef.current?.children[0];
            if (resizableContainer) {
                let containerWidth = Math.max(resizableContainer.clientWidth, minWidth);
                containerWidth = Math.min(resizableContainer.clientWidth, maxWidth);
                console.log(containerWidth);
                setResizableStateRef({
                    useDragging: resizableStateRef.current.useDragging,
                    width: containerWidth
                })
            }
        }
        window.addEventListener('resize', windowResizeHanlde);
        return () => {
            window.removeEventListener('resize', windowResizeHanlde);
        }
    }, []);
    return <div ref={resizableContainerRef} className={styles.PdfViewContainer}>
        <Resizable
            sideClassName={styles.resizableSide}
            minSize={{ width: widthRange.minWidth }}
            maxSize={{ width: widthRange.maxWidth }}
            size={{ width: resizableStateRef.current.width }}
            onResizeStart={(_e, _d, _realLength, nextLength) => {
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
                const resizableContainer = resizableContainerRef.current?.children[0];
                if (resizableContainer) {
                    setResizableStateRef({
                        useDragging: resizableStateRef.current.useDragging,
                        width: resizableContainer.clientWidth
                    })
                }
            }} className={styles.resizable} disabledDirection={['Top', 'Bottom', 'Left']} >
            <iframe width='100%' height='100%' title="resume-doc" src={src ? src : undefined} />
        </Resizable >
    </div>
}

export default PdfViewArea;
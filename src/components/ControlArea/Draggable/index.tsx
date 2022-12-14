import DragHandleIcon from '@mui/icons-material/DragHandle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useState } from "react";
import { SortableHandle } from "react-sortable-hoc";
import { animated, useSpring } from "react-spring";
import styles from './index.module.scss';

type DragHandleDndProps = {
    className?: string,
    isDragging: boolean
} & any

type DragHandleProps = {
    className?: string
} & any

export const DragHandleDnd = ({ className = '', isDragging, ...leftProps }: DragHandleDndProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const colorStyles = useSpring({ color: isHovering || isDragging ? 'rgb(46, 46, 46)' : 'gray', config: { duration: 300 } });
    return (
        <animated.span style={colorStyles}>
            <span onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className={`${styles.dragingHandlerPos} ${className}`} {...leftProps}><DragIndicatorIcon /></span>
        </animated.span>
    )
}

export const DragHandle: React.ComponentClass<DragHandleProps, any> = SortableHandle(({ className = '' }: DragHandleProps) => <span className={`${styles.dragingHandler} ${className}`}><DragIndicatorIcon /></span>);

export const MuiDragHandle: React.ComponentClass<DragHandleProps, any> = SortableHandle(({ className = '' }: DragHandleProps) => <span className={`${styles.itemDraggingHandler} ${className}`}><DragHandleIcon /></span>);

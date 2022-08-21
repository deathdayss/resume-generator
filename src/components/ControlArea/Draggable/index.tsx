import { SortableHandle } from "react-sortable-hoc";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import styles from './index.module.scss';
import DragHandleIcon from '@mui/icons-material/DragHandle';

interface DragHandleProps {
    className?: string
}


export const DragHandle: React.ComponentClass<DragHandleProps, any> = SortableHandle(({ className = '' }: DragHandleProps) => <span className={`${styles.dragingHandler} ${className}`}><DragIndicatorIcon /></span>);

export const MuiDragHandle: React.ComponentClass<DragHandleProps, any> = SortableHandle(({ className = '' }: DragHandleProps) => <span className={`${styles.itemDraggingHandler} ${className}`}><DragHandleIcon /></span>);

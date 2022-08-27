import { observer } from 'mobx-react-lite';
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

import ResizableSide from './ResizableSide';
import {
  Direction,
  ResizableContext,
  SideClickHandler,
  SideLength,
  SideResizeHandler,
  directions,
  getRealLength,
} from './utils';

interface Size {
  width?: number;
  height?: number;
}

export interface ResizableProps {
  className?: string;
  sideClassName?: string
  defaultSize?: Size;
  size?: Size;
  minSize?: Size;
  maxSize?: Size;
  children?: React.ReactNode;
  disabledDirection?: Direction[];
  bodyMaskZIndex?: number;
  sideZIndex?: number;
  onResizeStart?: SideResizeHandler;
  onResize?: SideResizeHandler;
  onResizeEnd?: SideResizeHandler;
  onSideClick?: SideClickHandler;
  onSideDoubleClick?: SideClickHandler;
}

const Resizable = ({
  className,
  sideClassName,
  defaultSize,
  size,
  minSize,
  maxSize,
  children,
  disabledDirection,
  bodyMaskZIndex = 10,
  sideZIndex = 51,
  onResizeStart,
  onResize,
  onResizeEnd,
  onSideClick,
  onSideDoubleClick,
}: ResizableProps) => {
  let [width, setWidth] = useState<SideLength>(
    defaultSize?.width === undefined ? 'auto' : defaultSize.width
  );
  let [height, setHeight] = useState<SideLength>(
    defaultSize?.height === undefined ? 'auto' : defaultSize.height
  );
  if (size?.width !== undefined) {
    width = size.width;
  }
  if (size?.height !== undefined) {
    height = size.height;
  }
  const contextValue = useMemo(() => {
    return {
      sideClassName,
      disabledDirection,
      onResizeStart,
      onResize,
      onResizeEnd,
      onSideClick,
      onSideDoubleClick,
      bodyMaskZIndex,
      sideZIndex,
    };
  }, [disabledDirection]);

  useEffect(() => {
    setWidth(getRealLength(width, minSize?.width, maxSize?.width));
    setHeight(getRealLength(height, minSize?.height, maxSize?.height));
  }, [minSize, maxSize]);

  return (
    <div
      className={className}
      style={{ width, height, position: 'relative' }}
    >
      <ResizableContext.Provider value={contextValue}>
        {directions.map((direction, index) => {
          const vertical = index % 2 === 1;
          return (
            <ResizableSide
              key={direction}
              direction={direction}
              sideLength={vertical ? width : height}
              minLength={vertical ? minSize?.width : minSize?.height}
              maxLength={vertical ? maxSize?.width : maxSize?.height}
              setSideLength={vertical ? setWidth : setHeight}
            />
          );
        })}
      </ResizableContext.Provider>
      {children}
    </div>
  );
};

export default observer(Resizable);

import React, { createContext } from 'react';

export type Direction = 'Top' | 'Right' | 'Bottom' | 'Left';
export type SideLength = number | 'auto' | 'initial';
export type SideResizeHandler = (
  e: MouseEvent | React.MouseEvent,
  direction: Direction,
  realLength: SideLength,
  nextLength: SideLength
) => void;
export type SideClickHandler = (
  e: MouseEvent | React.MouseEvent,
  direction: Direction
) => void;
export type SetNumberState = (value: SideLength) => void;

export const getRealLength = (
  currentLength: SideLength,
  minLength: number | undefined,
  maxLength: number | undefined
) => {
  if (typeof currentLength !== 'number') {
    return currentLength;
  }
  if (minLength !== undefined && currentLength < minLength) {
    currentLength = minLength;
  }
  if (maxLength !== undefined && currentLength > maxLength) {
    currentLength = maxLength;
  }
  return currentLength;
};

interface ResizableContextProps {
  sideClassName?: string,
  disabledDirection?: Direction[];
  onResizeStart?: (
    e: MouseEvent | React.MouseEvent,
    direction: Direction,
    startClient: number,
    startLength: SideLength
  ) => void;
  onResize?: SideResizeHandler;
  onResizeEnd?: SideResizeHandler;
  onSideClick?: SideClickHandler;
  onSideDoubleClick?: SideClickHandler;
  bodyMaskZIndex: number;
  sideZIndex: number;
}

export const ResizableContext = createContext<ResizableContextProps>({
  bodyMaskZIndex: 0,
  sideZIndex: 0,
});
export const directions: Direction[] = ['Top', 'Right', 'Bottom', 'Left'];

import { observer } from 'mobx-react-lite';
import React, { CSSProperties, MutableRefObject, useContext, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import useStateRef from '../hooks/useStateRef';

import {
  Direction,
  ResizableContext,
  SetNumberState,
  SideClickHandler,
  SideLength,
  getRealLength,
} from '../utils';

interface ResizableSideProps {
  direction: Direction;
  sideLength: SideLength;
  setSideLength: SetNumberState;
  minLength: number | undefined;
  maxLength: number | undefined;
}

const getNextLength = (
  e: MouseEvent,
  vertical: boolean,
  calculationMethod: boolean,
  startClient: number,
  previousLength: number,
  setSideLength: SetNumberState,
  minLength: number | undefined,
  maxLength: number | undefined
) => {
  const currentClient = vertical ? e.clientX : e.clientY;
  const deltaLength = calculationMethod
    ? currentClient - startClient
    : startClient - currentClient;
  const realLength = previousLength + deltaLength;
  const nexLength = getRealLength(realLength, minLength, maxLength);
  setSideLength(nexLength);
  return [realLength, nexLength];
};

const solveClickHandler = (
  e: React.MouseEvent,
  direction: Direction,
  sideClickHandler: SideClickHandler | undefined
) => {
  if (sideClickHandler !== undefined) {
    sideClickHandler(e, direction);
  }
};

const getSideStyle = (direction: Direction, vertical: boolean) => {
  const style: any = {};
  switch (direction) {
    case 'Top':
      style.top = '-0.25rem';
      break;
    case 'Right':
      style.right = '-0.25rem';
      break;
    case 'Bottom':
      style.bottom = '-0.25rem';
      break;
    case 'Left':
      style.left = '-0.25rem';
      break;
    default:
      throw new Error('No Such a Direction');
  }
  if (vertical) {
    style.width = '0.5rem';
    style.height = '100%';
    style.cursor = 'col-resize';
  }
  else {
    style.height = '0.5rem';
    style.width = '100%';
    style.cursor = 'row-resize';
  }
  return style;
};

const getMaskStyle = (zIndex: number, cursorStyle: string) => {
  const style = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    userSelect: 'none',
    cursor: cursorStyle,
    zIndex: `z-${zIndex <= 50 ? zIndex : `[${zIndex}]`}`
  }
  return style;
};

const ResizableSide = ({
  direction,
  sideLength,
  setSideLength,
  minLength,
  maxLength,
}: ResizableSideProps) => {
  const {
    sideClassName,
    disabledDirection,
    onResizeStart,
    onResize,
    onResizeEnd,
    onSideClick,
    onSideDoubleClick,
    bodyMaskZIndex,
    sideZIndex,
  } = useContext(ResizableContext);
  const disabled = (disabledDirection !== undefined && disabledDirection.includes(direction)) || sideLength === 'auto';
  const [startResizeLengthRef, setStartResizeLengthRef] =
    useStateRef(sideLength);
  const [startClientRef, setStartClientRef] = useStateRef(-1);
  const vertical = direction === 'Right' || direction === 'Left';
  const calculationMethod = direction === 'Right' || direction === 'Bottom';
  const sideStyle = useMemo(() => getSideStyle(direction, vertical), []);
  const cursorStyle = useMemo(
    () => (vertical ? 'col-resize' : 'row-resize'),
    []
  );

  useEffect(() => {
    if (disabled) {
      return;
    }
    const onMouseMoveHandler = (e: MouseEvent) => {
      if (startClientRef.current >= 0) {
        const [realLength, nextLength] = getNextLength(
          e,
          vertical,
          calculationMethod,
          startClientRef.current,
          startResizeLengthRef.current,
          setSideLength,
          minLength,
          maxLength
        );
        if (onResize !== undefined) {
          onResize(e, direction, realLength, nextLength);
        }
      }
    };

    const onMouseUpHandler = (e: MouseEvent) => {
      if (startClientRef.current >= 0) {
        document.body.style.userSelect = 'auto';
        document.body.style.cursor = 'auto';
        setStartClientRef(-1);
        const [realLength, nextLength] = getNextLength(
          e,
          vertical,
          calculationMethod,
          startClientRef.current,
          startResizeLengthRef.current,
          setSideLength,
          minLength,
          maxLength
        );
        if (onResizeEnd !== undefined) {
          onResizeEnd(e, direction, realLength, nextLength);
        }
      }
    };

    window.addEventListener('mousemove', onMouseMoveHandler);
    window.addEventListener('mouseup', onMouseUpHandler);
    return () => {
      window.removeEventListener('mousemove', onMouseMoveHandler);
      window.removeEventListener('mouseup', onMouseUpHandler);
    };
  }, [minLength, maxLength]);

  if (disabled) {
    return null;
  }

  const onMouseDownHandler = (e: React.MouseEvent) => {
    document.body.style.userSelect = 'none';
    document.body.style.cursor = cursorStyle;
    const startClient = vertical ? e.clientX : e.clientY;
    let trueSideLength = sideLength;
    if (typeof sideLength === 'number') {
      if (minLength !== undefined) {
        trueSideLength = Math.max(sideLength, minLength);
      }
      if (maxLength !== undefined) {
        trueSideLength = Math.min(sideLength, maxLength);
      }
    }
    setSideLength(trueSideLength);
    setStartResizeLengthRef(trueSideLength);
    setStartClientRef(startClient);
    if (onResizeStart !== undefined) {
      onResizeStart(e, direction, startClient, trueSideLength);
    }
  };

  const onClickHandler = (e: React.MouseEvent) => {
    solveClickHandler(e, direction, onSideClick);
  };

  const onDoubleClickHandler = (e: React.MouseEvent) => {
    solveClickHandler(e, direction, onSideDoubleClick);
  };

  return (
    <>
      <div
        className={sideClassName}
        style={{
          position: 'absolute',
          zIndex: sideZIndex,
          ...sideStyle
        }}
        onMouseDown={onMouseDownHandler}
        onClick={onClickHandler}
        onDoubleClick={onDoubleClickHandler}
      >
        {startClientRef.current >= 0
          ? ReactDOM.createPortal(
            <div style={getMaskStyle(bodyMaskZIndex, cursorStyle) as CSSProperties} />,
            document.body
          )
          : null}
      </div>
      {startClientRef.current >= 0 ? (
        <div style={getMaskStyle(sideZIndex - 1, cursorStyle) as CSSProperties} />
      ) : null}
    </>
  );
};

export default observer(ResizableSide);

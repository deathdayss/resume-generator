import { useRef, useState } from 'react';

const useStateRef = <T>(initial: T): any[] => {
  const [state, setState] = useState(initial);
  const stateRef = useRef(state);
  const setStateRef = (data: T) => {
    stateRef.current = data;
    setState(data);
  };
  return [stateRef, setStateRef];
};

export default useStateRef;

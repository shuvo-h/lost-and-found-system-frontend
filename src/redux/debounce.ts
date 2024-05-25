import { useState, useEffect, useRef } from 'react';

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const handler = useRef<number | undefined>(undefined);

  useEffect(() => {
    handler.current = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

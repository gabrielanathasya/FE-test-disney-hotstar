import { useState } from "react";

export const useDebounce = () => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const debounce = (fn: Function, delay: number = 500) => {
    clearTimeout(timeoutId);

    const id = setTimeout(() => {
      fn();
      setTimeoutId(undefined);
    }, delay);

    setTimeoutId(id);
  };

  return { timeoutId, debounce };
};

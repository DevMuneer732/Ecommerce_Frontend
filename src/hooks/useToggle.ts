import { useState } from 'react';

export const useToggle = (defaultValue = false) => {
  const [status, setStatus] = useState<boolean>(defaultValue);

  const on = () => {
    setStatus(true);
  };
  const off = () => {
    setStatus(false);
  };
  const toggle = () => {
    setStatus((prev) => !prev);
  };

  return {
    status,
    on,
    off,
    toggle,
  };
};

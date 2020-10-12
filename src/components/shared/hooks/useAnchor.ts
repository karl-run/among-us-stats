import { useState, MouseEvent, useMemo } from 'react';

type UseAnchor = [
  anchor: HTMLElement | null,
  actions: {
    handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
    handleClose: () => void;
  },
];

function useAnchor(): UseAnchor {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return [anchorEl, useMemo(() => ({ handleClick, handleClose }), [setAnchorEl])];
}

export default useAnchor;

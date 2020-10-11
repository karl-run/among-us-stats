import { useMemo, useState } from 'react';

interface UseDialogActions {
  close: () => void;
  open: () => void;
  toggle: () => void;
}

type UseBoolean = [isOpen: boolean, actions: UseDialogActions];

function useBoolean(initiallyOpen = false): UseBoolean {
  const [isOpen, set] = useState<boolean>(initiallyOpen);

  const actions = useMemo(
    () => ({
      close: () => {
        set(false);
      },
      open: () => {
        set(true);
      },
      toggle: () => {
        set((b) => !b);
      },
    }),
    [set],
  );
  return [isOpen, actions];
}

export default useBoolean;

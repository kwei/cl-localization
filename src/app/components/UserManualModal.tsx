'use client';

import { useFocusRef } from '@/hooks/useFocusRef';
import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';

interface Props {
  children: ReactNode;
}

export interface UserManualModalRef {
  open: () => void;
  close: () => void;
}

export const UserManualModal = forwardRef<UserManualModalRef, Props>(
  (props, ref) => {
    const { children } = props;
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const modalRef = useFocusRef<HTMLDivElement>(close);

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    if (!isOpen) return null;

    return (
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/60">
        <div
          ref={modalRef}
          className="flex h-full w-full flex-col gap-4 bg-white p-4 shadow-lg md:h-auto md:w-[700px] md:rounded-2xl"
        >
          <h3 className="w-full text-center text-xl font-bold">User Manual</h3>
          <div className="w-full flex-1">{children}</div>
          <div className="flex w-full flex-row-reverse items-center">
            <button
              type="button"
              onClick={close}
              className="rounded-md bg-gray-500/50 px-4 py-2 transition-colors hover:bg-gray-500/30"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  },
);
UserManualModal.displayName = 'UserManualModal';

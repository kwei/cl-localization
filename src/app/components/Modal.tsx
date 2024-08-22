'use client';

import { CheckIcon } from '@/app/components/CheckIcon';
import { CloseIcon } from '@/app/components/CloseIcon';
import { useFocusRef } from '@/hooks/useFocusRef';
import { ReactNode } from 'react';

export const Modal = (props: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}) => {
  const { title, children, onClose, onConfirm } = props;
  const ref = useFocusRef<HTMLDivElement>(() => {
    onClose();
  });
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={ref}
        className="relative flex h-full w-full flex-col gap-4 bg-white p-4 shadow-lg md:h-[700px] md:w-[700px] md:rounded-2xl"
      >
        <h3 className="w-full pt-4 text-center text-xl font-bold">{title}</h3>
        {children}
        <div className="flex w-full items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-500/50 px-4 py-2 transition-colors hover:bg-gray-500/30"
          >
            Close
          </button>
          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              className="flex items-center gap-2 rounded-md bg-green-500/50 px-4 py-2 transition-colors hover:bg-green-500/30"
            >
              <CheckIcon />
              Confirm
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-200 hover:text-black"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

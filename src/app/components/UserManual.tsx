'use client';

import {
  UserManualModal,
  UserManualModalRef,
} from '@/app/components/UserManualModal';
import { ReactNode, useRef } from 'react';

export const UserManual = ({ children }: { children: ReactNode }) => {
  const ref = useRef<UserManualModalRef>(null);

  const openModal = () => {
    ref.current?.open();
  };

  return (
    <>
      <button
        type="button"
        className="w-fit font-semibold underline transition-colors hover:text-yellow-500"
        onClick={openModal}
        title="How to use?"
      >
        How to use?
      </button>
      <UserManualModal ref={ref}>{children}</UserManualModal>
    </>
  );
};

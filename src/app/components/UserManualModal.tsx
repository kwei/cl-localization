'use client';

import { Modal } from '@/app/components/Modal';
import {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

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

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    const handleOnClose = useCallback(() => {
      setIsOpen(false);
    }, []);

    if (!isOpen) return null;

    return (
      <Modal title="User Manual" onClose={handleOnClose}>
        <div className="w-full flex-1">{children}</div>
      </Modal>
    );
  },
);
UserManualModal.displayName = 'UserManualModal';

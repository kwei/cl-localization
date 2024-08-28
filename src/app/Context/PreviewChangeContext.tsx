'use client';

import { Modal } from '@/app/components/Modal';
import { useFileCtx } from "@/app/modify/FileContext";
import { Locales } from '@/constants';
import {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ContextValue {
  open: (flag: boolean) => void;
  setData: (data: Record<string, Record<string, string>>) => void;
}

const initCtxVal = {
  open: (_flag: boolean) => {},
  setData: (_data: Record<string, Record<string, string>>) => {},
};

export const PreviewChangeContext = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Record<string, Record<string, string>>>();

  const ctxVal = useMemo(
    () => ({
      open: setOpen,
      setData,
    }),
    [],
  );

  return (
    <Ctx.Provider value={ctxVal}>
      {children}
      {open && data && <PreviewChangeModal data={data} />}
    </Ctx.Provider>
  );
};

const Ctx = createContext<ContextValue>(initCtxVal);
export const usePreviewChangeModal = () => useContext(Ctx);

const PreviewChangeModal = ({
  data,
}: {
  data: Record<string, Record<string, string>>;
}) => {
  const { open } = usePreviewChangeModal();
  const {data: old} = useFileCtx();

  const handleOnClose = useCallback(() => {
    open(false);
  }, [open]);

  return (
    <Modal title="Coming Soon!" onClose={handleOnClose}>
      <div className="flex w-full flex-1 flex-col gap-4 overflow-y-auto p-4">
        {Locales.map((locale) => (
          <Fragment key={locale}>
            <ChangeList old={old[locale]} data={data[locale]} />
          </Fragment>
        ))}
      </div>
    </Modal>
  );
};

const ChangeList = ({ old, data }: { old: Record<string, string>, data: Record<string, string> }) => {



  return (
    <div></div>
  );
};

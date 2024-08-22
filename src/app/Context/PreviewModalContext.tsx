'use client';

import { CheckIcon } from '@/app/components/CheckIcon';
import { CopyIcon } from '@/app/components/CopyIcon';
import { Modal } from '@/app/components/Modal';
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

export const PreviewModalContext = ({ children }: { children: ReactNode }) => {
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
      {open && data && <PreviewModal data={data} />}
    </Ctx.Provider>
  );
};

const Ctx = createContext<ContextValue>(initCtxVal);
export const usePreviewModal = () => useContext(Ctx);

const PreviewModal = ({
  data,
}: {
  data: Record<string, Record<string, string>>;
}) => {
  const { open } = usePreviewModal();

  const handleOnClose = useCallback(() => {
    open(false);
  }, [open]);

  return (
    <Modal title="Preview Localization Result" onClose={handleOnClose}>
      <div className="flex w-full flex-1 flex-col gap-4 overflow-y-auto p-4">
        {Locales.map((locale) => (
          <Fragment key={locale}>
            <LocaleResultBlock locale={locale} value={data[locale]} />
          </Fragment>
        ))}
      </div>
    </Modal>
  );
};

const LocaleResultBlock = ({
  locale,
  value,
}: {
  locale: string;
  value: Record<string, string>;
}) => {
  const jsonValue = useMemo(() => JSON.stringify(value, undefined, 2), [value]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(jsonValue.slice(1, jsonValue.length - 2))
      .then();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [jsonValue]);

  return (
    <fieldset className="group relative w-full rounded-md border border-solid border-gray-500 px-4 pb-2">
      <legend className="px-2 font-semibold">{locale}</legend>
      <pre className="w-full max-w-[280px] overflow-x-auto text-gray-500 md:max-w-[580px]">
        {jsonValue}
      </pre>
      <button
        type="button"
        title="copy"
        onClick={handleCopy}
        disabled={copied}
        className="invisible absolute -top-2 right-1 flex size-7 items-center justify-center rounded-full p-2 transition-all hover:bg-gray-500/30 group-hover:visible"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </fieldset>
  );
};

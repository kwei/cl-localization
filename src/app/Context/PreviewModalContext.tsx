'use client';

import { CheckIcon } from '@/app/components/CheckIcon';
import { CopyIcon } from '@/app/components/CopyIcon';
import { useFocusRef } from '@/hooks/useFocusRef';
import {
  createContext,
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
  const ref = useFocusRef<HTMLDivElement>(() => {
    open(false);
  });
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50">
      <div
        ref={ref}
        className="flex h-[700px] w-[700px] flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg"
      >
        <h3 className="w-full text-center text-xl font-bold">
          Preview Localization Result
        </h3>
        <div className="flex w-full flex-1 flex-col gap-4 overflow-y-auto p-4">
          {Object.keys(data).map((key) => (
            <LocalResultBlock key={key} local={key} value={data[key]} />
          ))}
        </div>
        <div className="flex w-full flex-row-reverse items-center">
          <button
            type="button"
            onClick={() => open(false)}
            className="rounded-md bg-green-500/50 px-4 py-2 transition-colors hover:bg-green-500/30"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const LocalResultBlock = ({
  local,
  value,
}: {
  local: string;
  value: Record<string, string>;
}) => {
  const jsonValue = useMemo(() => JSON.stringify(value, undefined, 2), [value]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(jsonValue).then();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [jsonValue]);

  return (
    <fieldset
      key={local}
      className="group relative w-full rounded-md border border-solid border-gray-500 px-4 pb-2"
    >
      <legend className="px-2 font-semibold">{local}</legend>
      <pre className="w-full max-w-[580px] overflow-x-auto text-gray-500">
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

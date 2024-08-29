'use client';

import { CheckIcon } from '@/app/components/CheckIcon';
import { CopyIcon } from '@/app/components/CopyIcon';
import { DownloadIcon } from '@/app/components/DownloadIcon';
import { Modal } from '@/app/components/Modal';
import { useFileCtx } from '@/app/modify/FileContext';
import { Locale, LOCALE_FILE_NAME_MAP, Locales } from '@/constants';
import {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
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
  const {
    data: old,
    updatedNewKeys,
    originalKeys,
    updatedOriginalKeys,
  } = useFileCtx();
  const [copied, setCopied] = useState<boolean>(false);

  const handleOnClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleCopy = useCallback(
    (locale: Locale) => {
      const jsonValue = JSON.stringify(data[locale], undefined, 2);
      navigator.clipboard
        .writeText(jsonValue.slice(1, jsonValue.length - 2))
        .then();
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    },
    [data],
  );

  const handleDownloadJSON = useCallback(() => {
    const res = { ...old };
    Locales.forEach((locale) => {
      originalKeys.forEach((key) => delete res[locale][key]);
      updatedOriginalKeys.forEach((key) => {
        res[locale][key] = data[locale][key];
      });
      updatedNewKeys.forEach((key) => {
        res[locale][key] = data[locale][key];
      });
      const ordered = Object.keys(res[locale])
        .sort()
        .reduce((obj: Record<string, string>, key) => {
          obj[key] = res[locale][key];
          return obj;
        }, {});
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(ordered, undefined, 2));
      const anchorElement = document.getElementById('hidden-download-btn');
      anchorElement?.setAttribute('href', dataStr);
      anchorElement?.setAttribute(
        'download',
        `${LOCALE_FILE_NAME_MAP[locale]}.json`,
      );
      anchorElement?.click();
    });
  }, [data, old, originalKeys, updatedNewKeys, updatedOriginalKeys]);

  return (
    <Modal
      title="Preview Changes"
      onClose={handleOnClose}
      onConfirm={handleDownloadJSON}
      confirmLabel={
        <>
          <DownloadIcon />
          Download
        </>
      }
    >
      <div className="flex w-full flex-1 flex-col gap-4 overflow-y-auto p-4">
        {Locales.map((locale) => (
          <Fragment key={locale}>
            <fieldset className="group relative w-full rounded-md border border-solid border-gray-500 px-4 pb-2">
              <legend className="px-2 font-semibold">{locale}</legend>
              <ChangeList old={old[locale]} data={data[locale]} />
              <button
                type="button"
                title="copy"
                onClick={() => handleCopy(locale)}
                disabled={copied}
                className="invisible absolute -top-2 right-1 flex size-7 items-center justify-center rounded-full p-2 transition-all hover:bg-gray-500/30 group-hover:visible"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </fieldset>
          </Fragment>
        ))}
      </div>
      <a id="hidden-download-btn" className="hidden"></a>
    </Modal>
  );
};

const ChangeList = ({
  old,
  data,
}: {
  old: Record<string, string>;
  data: Record<string, string>;
}) => {
  const { updatedNewKeys, originalKeys, updatedOriginalKeys } = useFileCtx();

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-px overflow-x-auto md:max-w-[580px]">
      {originalKeys.map((originalKey, i) => (
        <ChangeRow
          key={`${originalKey}-${updatedOriginalKeys[i]}-${i.toString()}`}
          originalKey={originalKey}
          originalValue={old[originalKey]}
          newKey={updatedOriginalKeys[i]}
          newValue={data[updatedOriginalKeys[i]]}
        />
      ))}
      {updatedNewKeys.map((updatedNewKey, i) => (
        <ChangeRow
          key={`${updatedNewKey}-${i.toString()}`}
          newKey={updatedNewKey}
          newValue={data[updatedNewKey]}
        />
      ))}
    </div>
  );
};

const ChangeRow = ({
  originalKey = '',
  originalValue = '',
  newKey,
  newValue,
}: {
  originalKey?: string;
  originalValue?: string;
  newKey: string;
  newValue: string;
}) => {
  return (
    <div className="flex w-full items-center whitespace-nowrap text-sm">
      <ChangeText
        originalStr={'"' + originalKey + '"'}
        newStr={'"' + newKey + '"'}
      />
      :
      <ChangeText
        originalStr={'"' + originalValue + '"'}
        newStr={'"' + newValue + '"'}
      />
    </div>
  );
};

enum ChangeType {
  Default,
  New,
  Update,
}

const ChangeText = ({
  originalStr,
  newStr,
}: {
  originalStr: string;
  newStr: string;
}) => {
  const [changeSet, setChangeSet] = useState<
    {
      text: string;
      changeType: ChangeType;
    }[]
  >([]);

  useEffect(() => {
    let baseIndex = 0;
    let newIndex = 0;
    const res: {
      text: string;
      changeType: ChangeType;
    }[] = [];
    while (true) {
      const currentBaseChar = originalStr[baseIndex];
      const currentCompareChar = newStr[newIndex];
      if (currentBaseChar === currentCompareChar) {
        res.push({
          text: currentBaseChar,
          changeType: ChangeType.Default,
        });
        baseIndex++;
        newIndex++;
      } else {
        let earlyBreak = false;
        const temp: string[] = [];
        for (let i = baseIndex; i < originalStr.length; i++) {
          const _currentBaseChar = originalStr[i];
          if (_currentBaseChar === currentCompareChar) {
            baseIndex = i;
            earlyBreak = true;
            break;
          } else {
            temp.push(_currentBaseChar);
          }
        }
        if (earlyBreak) {
          res.push({
            text: temp.join(''),
            changeType: ChangeType.Update,
          });
        } else {
          res.push({
            text: currentCompareChar,
            changeType: ChangeType.New,
          });
          newIndex++;
        }
      }
      if (baseIndex === originalStr.length && newIndex === newStr.length) {
        break;
      }
    }
    setChangeSet(res);
  }, [newStr, originalStr]);

  return (
    <p>
      {changeSet.map((change, i) => (
        <span
          key={`${change.text}-${i.toString()}`}
          className={`${change.changeType === ChangeType.New && 'bg-green-500/50'} ${change.changeType === ChangeType.Update && 'bg-red-500/50'}`}
        >
          {change.text}
        </span>
      ))}
    </p>
  );
};

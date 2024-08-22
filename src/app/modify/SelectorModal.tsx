'use client';

import { CloseIcon } from '@/app/components/CloseIcon';
import { Dropdown, DropdownOption } from '@/app/components/Dropdown';
import { Modal } from '@/app/components/Modal';
import { useFileCtx } from '@/app/modify/FileContext';
import { Locale } from '@/constants';
import { ReactNode, useCallback, useEffect, useState } from 'react';

export const SelectorModal = ({ children }: { children: ReactNode }) => {
  const { data, setSelectedRows, openSelector, setOpenSelector } = useFileCtx();
  const [show, setShow] = useState(false);

  const handleOnConfirm = useCallback(
    (indexes: number[]) => {
      if (indexes.length === 0) return;
      setSelectedRows(indexes);
      setOpenSelector(false);
    },
    [setOpenSelector, setSelectedRows],
  );

  useEffect(() => {
    if (Object.keys(data).length > 0 && openSelector) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [data, openSelector]);

  return (
    <>
      {children}
      {show && (
        <ModalContent data={data[Locale.Default]} onConfirm={handleOnConfirm} />
      )}
    </>
  );
};

const ModalContent = ({
  data,
  onConfirm,
}: {
  data: Record<string, string>;
  onConfirm: (rows: number[]) => void;
}) => {
  const { setOpenSelector } = useFileCtx();

  const handleOnClose = useCallback(() => {
    setOpenSelector(false);
  }, [setOpenSelector]);

  const handleOnConfirm = useCallback(() => {
    const rows = (document.getElementById('rows') as HTMLInputElement).value;
    const selectedRows = rows.split(',').map(Number);
    onConfirm(selectedRows);
  }, [onConfirm]);

  return (
    <Modal
      title="Select Data Rows"
      onClose={handleOnClose}
      onConfirm={handleOnConfirm}
    >
      <SelectRows data={data} />
    </Modal>
  );
};

const SelectRows = ({ data }: { data: Record<string, string> }) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, number>>({});

  const handleOnSelectKey = (val: string) => {
    const key = val.split(':')[0];
    const index = Number(val.split(':')[1]);
    setSelectedRows((prevState) => {
      const newState = { ...prevState };
      if (Object.keys(newState).includes(key)) {
        delete newState[key];
      } else {
        newState[key] = index;
      }
      return newState;
    });
  };

  const handleOnRemoveKey = (key: string) => {
    setSelectedRows((prevState) => {
      const newState = { ...prevState };
      delete newState[key];
      return newState;
    });
  };

  return (
    <div className="flex min-h-[500px] w-full flex-1 flex-col gap-4 overflow-y-auto p-4">
      <div className="flex w-full">
        <Dropdown
          placeholder="Select Key"
          onChange={handleOnSelectKey}
          className="rounded-md border border-solid border-gray-500 p-2"
        >
          <div className="flex max-h-[220px] flex-col gap-1 overflow-y-auto rounded-md border border-solid border-gray-500 bg-white p-2">
            {Object.keys(data).map((key, i) => (
              <DropdownOption
                className={`flex w-full items-center rounded px-2 py-1 hover:bg-gray-300 ${Object.keys(selectedRows).includes(key) ? 'bg-gray-200' : ''}`}
                key={key}
                value={`${key}:${i}`}
                title={key}
                closeOnSelect={false}
              >
                <span className="w-full overflow-x-hidden text-ellipsis whitespace-nowrap text-start">
                  {key}
                </span>
              </DropdownOption>
            ))}
          </div>
        </Dropdown>
        <input
          type="text"
          id={`rows`}
          className="hidden"
          value={Object.values(selectedRows).join(',')}
          readOnly
        />
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        <div className="flex flex-wrap gap-2">
          {Object.keys(selectedRows).map((key) => (
            <KeyBlock key={key} value={key} removeKey={handleOnRemoveKey} />
          ))}
        </div>
      </div>
    </div>
  );
};

const KeyBlock = ({
  value,
  removeKey,
}: {
  value: string;
  removeKey: (key: string) => void;
}) => {
  const handleOnRemove = useCallback(() => {
    removeKey(value);
  }, [removeKey, value]);

  return (
    <div className="relative flex shrink-0 select-none items-center self-start rounded-full bg-gray-200 py-1 pl-2 pr-7 text-sm transition-colors hover:bg-gray-300">
      {value}
      <button
        type="button"
        onClick={handleOnRemove}
        className="absolute right-1 flex size-5 origin-center items-center justify-center rounded-full p-1 text-red-500 transition-all hover:bg-red-500/20"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

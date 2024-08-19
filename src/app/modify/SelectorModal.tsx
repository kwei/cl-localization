'use client';

import { useFileCtx } from '@/app/modify/FileContext';
import { Locale } from '@/constants';
import { useFocusRef } from '@/hooks/useFocusRef';
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
        <Modal data={data[Locale.Default]} onConfirm={handleOnConfirm} />
      )}
    </>
  );
};

const Modal = ({
  data,
  onConfirm,
}: {
  data: Record<string, string>;
  onConfirm: (rows: number[]) => void;
}) => {
  const { setOpenSelector } = useFileCtx();
  const ref = useFocusRef<HTMLDivElement>(() => {
    setOpenSelector(false);
  });
  const handleOnConfirm = useCallback(() => {
    const selectedRows: number[] = [];
    Object.keys(data).forEach((_, i) => {
      const row = document.getElementById(`row-${i}`) as HTMLInputElement;
      if (row.checked) selectedRows.push(i);
    });
    onConfirm(selectedRows);
  }, [data, onConfirm]);

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={ref}
        className="flex h-auto max-h-[700px] w-[700px] flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg"
      >
        <h3 className="w-full text-center text-xl font-bold">
          Select Data Rows
        </h3>
        <PreviewJSON data={data} />
        <div className="flex w-full flex-row-reverse items-center">
          <button
            type="button"
            onClick={handleOnConfirm}
            className="rounded-md bg-green-500/50 px-4 py-2 transition-colors hover:bg-green-500/30"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const PreviewJSON = ({ data }: { data: Record<string, string> }) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = () => {
    setSelectAll(true);
  };

  const handleClearAll = () => {
    setSelectAll(false);
  };

  return (
    <div className="flex w-full flex-1 flex-col overflow-y-auto p-4">
      <div className="flex w-full flex-row-reverse items-center gap-4 pb-4">
        <button
          type="button"
          onClick={handleClearAll}
          className="rounded-md border border-solid border-red-500/50 px-4 py-1 text-red-500 transition-colors hover:bg-red-500/30 hover:text-red-800"
        >
          Clear All
        </button>
        <button
          type="button"
          onClick={handleSelectAll}
          className="rounded-md border border-solid border-blue-500/50 px-4 py-1 text-blue-500 transition-colors hover:bg-blue-500/30 hover:text-blue-800"
        >
          Select All
        </button>
      </div>
      <div className="flex h-full w-full flex-col gap-1 overflow-y-auto pb-4">
        {'{'}
        {Object.keys(data).map((key, i) => (
          <RowData
            label={key}
            value={data[key]}
            index={i}
            selected={selectAll}
            key={key}
          />
        ))}
        {'}'}
      </div>
    </div>
  );
};

const RowData = ({
  label,
  value,
  index,
  selected,
}: {
  label: string;
  value: string;
  index: number;
  selected: boolean;
}) => {
  const [clicked, setClicked] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleOnChange = () => {
    setChecked((prevState) => !prevState);
  };

  const handleOnMouseEnter = useCallback(() => {
    if (clicked) {
      setChecked(true);
    }
  }, [clicked]);

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  useEffect(() => {
    function handleMouseDown() {
      setClicked(true);
    }

    function handleMouseUp() {
      setClicked(false);
    }

    document.body.addEventListener('mousedown', handleMouseDown);
    document.body.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.body.removeEventListener('mousedown', handleMouseDown);
      document.body.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="w-full pl-4 text-sm" onMouseEnter={handleOnMouseEnter}>
      <input
        type="checkbox"
        id={`row-${index.toString()}`}
        name={`row-${index.toString()}`}
        className="hidden"
        onChange={handleOnChange}
        checked={checked}
      />
      <label
        htmlFor={`row-${index.toString()}`}
        className={`flex w-full select-none items-center gap-1 rounded-md px-2 py-1 ${checked ? 'bg-blue-500/20' : ''}`}
      >
        <span
          title={label}
          className="whitespace-nowrap text-right font-semibold"
        >
          {'"'}
          {label}
          {'"'}
        </span>
        :
        <span className="truncate whitespace-nowrap" title={value}>
          {'"'}
          {value}
          {'"'}
        </span>
      </label>
    </div>
  );
};

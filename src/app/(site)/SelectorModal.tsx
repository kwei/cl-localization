'use client';

import { useFileCtx } from '@/app/(site)/FileContext';
import { useFocusRef } from '@/hooks/useFocusRef';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Row } from 'read-excel-file';

export const SelectorModal = ({ children }: { children: ReactNode }) => {
  const { rows, setSelectedRows, openSelector, setOpenSelector } = useFileCtx();
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
    if (rows.length > 0 && openSelector) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [rows.length, openSelector]);

  return (
    <>
      {children}
      {show && <Modal rows={rows} onConfirm={handleOnConfirm} />}
    </>
  );
};

const Modal = ({
  rows,
  onConfirm,
}: {
  rows: Row[];
  onConfirm: (rows: number[]) => void;
}) => {
  const { setOpenSelector } = useFileCtx();
  const ref = useFocusRef<HTMLDivElement>(() => {
    setOpenSelector(false);
  });
  const handleOnConfirm = useCallback(() => {
    const selectedRows: number[] = [];
    for (let i = 0; i < rows.length; i++) {
      const row = document.getElementById(`row-${i}`) as HTMLInputElement;
      if (row.checked) selectedRows.push(i);
    }
    onConfirm(selectedRows);
  }, [onConfirm, rows.length]);

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50">
      <div
        ref={ref}
        className="flex h-[700px] w-[700px] flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg"
      >
        <h3 className="w-full text-center text-xl font-bold">
          Select Data Rows
        </h3>
        <PreviewExcel rows={rows} />
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

const PreviewExcel = ({ rows }: { rows: Row[] }) => {
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
      <div className="h-full w-full overflow-y-auto pb-4">
        {rows.map((row, i) => (
          <RowData
            row={row}
            index={i}
            selected={selectAll}
            key={`row-${i.toString()}`}
          />
        ))}
      </div>
    </div>
  );
};

const RowData = ({
  row,
  index,
  selected,
}: {
  row: Row;
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
    <div className="w-full text-sm" onMouseEnter={handleOnMouseEnter}>
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
        className="flex w-full items-center"
      >
        <span className="w-6 shrink-0 select-none whitespace-nowrap border-b border-solid border-white bg-white p-1 text-right text-gray-300">
          {index}
        </span>
        {row.map((cell, j) => (
          <div
            key={`col-${j.toString()}`}
            className={`flex w-full max-w-24 shrink-0 items-center border-b border-r border-solid border-gray-500 p-1 last:border-r-0 ${checked ? 'bg-blue-500/20' : ''}`}
          >
            <span
              className={`select-none truncate whitespace-nowrap ${cell ? 'visible' : 'invisible'}`}
              title={cell ? cell.toString() : 'Null'}
            >
              {cell ? cell.toString() : 'Null'}
            </span>
          </div>
        ))}
      </label>
    </div>
  );
};

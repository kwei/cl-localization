'use client';

import { useFileCtx } from '@/app/(site)/FileContext';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Row } from 'read-excel-file';

export const SelectorModal = ({ children }: { children: ReactNode }) => {
  const { rows, setSelectedRows } = useFileCtx();
  const [show, setShow] = useState(false);

  const handleOnConfirm = useCallback(
    (indexes: number[]) => {
      if (indexes.length === 0) return;
      setSelectedRows(indexes);
      setShow(false);
    },
    [setSelectedRows],
  );

  useEffect(() => {
    if (rows.length > 0) {
      setShow(true);
    }
  }, [rows.length]);

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
      <div className="flex h-[700px] w-[500px] flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg">
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
  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-4">
      {rows.map((row, i) => (
        <RowData row={row} index={i} key={`row-${i.toString()}`} />
      ))}
    </div>
  );
};

const RowData = ({ row, index }: { row: Row; index: number }) => {
  const [clicked, setClicked] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleOnChange = () => {
    setChecked((prevState) => !prevState);
  };

  const handleOnMouseOver = useCallback(() => {
    if (clicked) {
      setChecked(true);
    }
  }, [clicked]);

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
    <div className="w-full text-sm" onMouseOver={handleOnMouseOver}>
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

'use client';

import { CloseIcon } from '@/app/components/CloseIcon';
import { useFileCtx } from '@/app/(site)/FileContext';
import { useMemo, useRef } from 'react';

export const KeyEditor = () => {
  const { rows, selectedRows } = useFileCtx();
  const prefixRef = useRef<HTMLInputElement>(null);

  const originalKey = useMemo(() => {
    if (rows.length === 0) return [];
    const filteredRows = rows.filter((_, i) => selectedRows.includes(i));
    let keyIndex = 0;
    rows[0].forEach((cell, i) => {
      if (cell?.toString() === 'ENU' || cell?.toString() === 'ENG') {
        keyIndex = i;
      }
    });
    return filteredRows.map((row) => row[keyIndex]);
  }, [rows, selectedRows]);

  return (
    <div className="col-span-7 flex flex-col gap-4">
      <h3 className="w-full py-2 text-center text-xl font-bold">
        Edit Custom Key
      </h3>
      <fieldset className="flex w-full items-center rounded border border-solid border-gray-500 py-2 pl-2 transition-colors hover:border-gray-500/70">
        <input
          ref={prefixRef}
          type="text"
          name="prefix"
          className="w-full bg-transparent px-2 focus:outline-0"
          placeholder="prefix.type"
        />
      </fieldset>
      <div className="flex h-[500px] w-full flex-col gap-1 overflow-y-auto rounded-md border-4 border-dashed border-gray-500 p-4 transition-colors hover:border-gray-500/70">
        {originalKey.map(
          (key, index) =>
            key && (
              <EditBlock
                key={`${key.toString()}-${index.toString()}`}
                label={key.toString()}
                index={index}
              />
            ),
        )}
      </div>
    </div>
  );
};

const EditBlock = ({ label, index }: { label: string; index: number }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearValue = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  return (
    <div
      key={`${label}-${index.toString()}`}
      className="group relative grid w-full grid-cols-12 gap-1"
    >
      <div className="col-span-3 break-words rounded-md bg-gray-500/70 p-2">
        {label}
      </div>
      <input
        type="text"
        ref={inputRef}
        name={`new-key-${index.toString()}`}
        className="col-span-9 rounded-md border border-solid border-gray-500 bg-transparent p-2 pr-8 focus:outline-0"
        defaultValue={label}
      />
      <button
        type="button"
        onClick={handleClearValue}
        className="invisible absolute right-2 top-2 flex size-6 origin-center items-center justify-center rounded-full p-1 text-red-500 transition-all hover:bg-red-500/20 group-hover:visible"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

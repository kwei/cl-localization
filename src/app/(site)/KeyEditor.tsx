'use client';

import { useFileCtx } from '@/app/(site)/FileContext';
import { useMemo, useRef } from 'react';
import { KeyEditBlock } from '@/app/components/KeyEditorBlock';

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
    <div className="col-span-12 flex flex-col gap-4 md:col-span-7">
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
      <div className="flex min-h-[300px] w-full flex-1 flex-col gap-1 overflow-y-auto rounded-md border-4 border-dashed border-gray-500 p-4 transition-colors hover:border-gray-500/70">
        {originalKey.map(
          (key, index) =>
            key && (
              <KeyEditBlock
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

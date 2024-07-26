'use client';

import { useFileCtx } from '@/app/(site)/FileContext';
import { useMemo, useRef } from 'react';

export const KeyEditor = () => {
  const { rows } = useFileCtx();
  const prefixRef = useRef<HTMLInputElement>(null);

  const originalKey = useMemo(() => rows.slice(1).map((row) => row[0]), [rows]);

  return (
    <div className="col-span-7 flex flex-col gap-4">
      <h3 className="w-full py-4 text-center text-xl font-bold">
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
        {originalKey.map((key, index) => (
          <div
            key={`${key.toString()}-${index.toString()}`}
            className="grid w-full grid-cols-12 gap-1"
          >
            <div className="col-span-3 break-words rounded-md bg-gray-500/70 p-2">
              {key.toString()}
            </div>
            <input
              type="text"
              name={`new-key-${index.toString()}`}
              className="col-span-9 rounded-md border border-solid border-gray-500 bg-transparent p-2 focus:outline-0"
              defaultValue={key.toString()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

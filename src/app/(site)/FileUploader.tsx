'use client';

import { useFileCtx } from '@/app/(site)/FileContext';
import { SearchIcon } from '@/app/(site)/SearchIcon';
import { ACCEPTED_FILE_TYPE, useFileUpload } from '@/hooks/useFileUpload';
import { useCallback, useEffect, useRef } from 'react';

export const FileUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const sheetRef = useRef<HTMLInputElement>(null);
  const { setFile, setSheetName } = useFileCtx();
  const { file, getDropProperties, handleOnChange } = useFileUpload();

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleSearchFile = useCallback(() => {
    const sheetName = sheetRef.current?.value;
    if (!sheetName || sheetName.trim() === '') return;
    setSheetName(sheetName);
  }, []);

  useEffect(() => {
    if (file) {
      setFile(file);
    }
  }, [file]);

  return (
    <div className="col-span-5 flex flex-col gap-4">
      <h3 className="w-full py-4 text-center text-xl font-bold">
        Choose Excel File
      </h3>
      <div className="flex w-full items-center">
        <fieldset className="flex flex-1 items-center rounded-md rounded-r-none border border-r-0 border-solid border-gray-500 py-2 pl-2 transition-colors hover:border-gray-500/70">
          <input
            ref={sheetRef}
            type="text"
            name="sheetName"
            className="w-full bg-transparent px-2 focus:outline-0"
            placeholder="sheetName"
          />
        </fieldset>
        <button
          type="button"
          onClick={handleSearchFile}
          className="flex h-full items-center justify-center rounded-r-md border border-solid border-gray-500 bg-green-400/70 px-3 leading-6 transition-colors hover:bg-green-400"
        >
          <SearchIcon />
        </button>
      </div>
      <div
        className="relative flex h-[300px] p-4 w-full cursor-pointer items-center justify-center rounded-md border-4 border-dashed border-gray-500 transition-colors hover:border-gray-500/70"
        {...getDropProperties()}
        onClick={handleClick}
      >
        <div className="text-xl font-semibold">
          {file ? (
            <div className="flex w-full flex-col text-base">
              <span>{file.name}</span>
              <span>{file.size} Bytes</span>
              <span>{new Date(file.lastModified).toLocaleString()}</span>
            </div>
          ) : (
            'Click to upload or drop the excel!'
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          name="file"
          onChange={handleOnChange}
          accept={ACCEPTED_FILE_TYPE.toString()}
          hidden
        />
      </div>
    </div>
  );
};

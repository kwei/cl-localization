'use client';

import { useFileCtx } from '@/app/(site)/FileContext';
import { Dropdown, DropdownOption } from '@/app/components/Dropdown';
import { SearchIcon } from '@/app/components/SearchIcon';
import { TrashCanIcon } from '@/app/components/TrashCanIcon';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

const ACCEPTED_FILE_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const FileUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tabName, setTabName] = useState<string>();
  const { sheetNames, setFile, setSheetName, setOpenSelector } = useFileCtx();
  const [localFile, setLocalFile] = useState<File | null>(null);
  const { files, getDropProperties, handleOnChange, clear } = useFileUpload(
    (_file) => _file.type === ACCEPTED_FILE_TYPE,
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleOnChangeTab = (name: string) => {
    setTabName(name);
  };

  const handleSearchFile = useCallback(() => {
    if (!tabName || tabName.trim() === '') return;
    setSheetName(tabName);
    setOpenSelector(true);
  }, [setOpenSelector, setSheetName, tabName]);

  const handleClear = useCallback(() => {
    clear();
    setFile(null);
    setSheetName('');
    setTabName(undefined);
    if (!inputRef.current) return;
    inputRef.current.value = '';
  }, [clear, setFile, setSheetName]);

  useEffect(() => {
    if (files && files['_default']) {
      setFile(files['_default']);
      setLocalFile(files['_default']);
    }
  }, [files, setFile]);

  return (
    <div className="col-span-12 flex flex-col gap-4 md:col-span-5">
      <h3 className="w-full py-2 text-center text-xl font-bold">
        Choose Excel File
      </h3>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="grid w-full grid-cols-5">
          <div className="col-span-4">
            <Dropdown
              value={tabName}
              placeholder="Choose Tab"
              className="w-full rounded-l-md border border-r-0 border-solid border-gray-500 bg-gray-300 px-4 py-2 transition-colors hover:bg-gray-300/50"
              onChange={handleOnChangeTab}
              searchable
            >
              <div className="flex max-h-[350px] flex-col gap-1 overflow-y-auto rounded-md border border-solid border-gray-500 bg-gray-300 p-2">
                {sheetNames.map((tab) => (
                  <Fragment key={tab}>
                    <DropdownOption
                      value={tab}
                      label={tab}
                      className={`${tabName === tab ? 'bg-white/70' : ''} rounded-sm px-4 py-1 text-left transition-colors hover:bg-white/50`}
                    >
                      {tab}
                    </DropdownOption>
                  </Fragment>
                ))}
              </div>
            </Dropdown>
            <input
              type="text"
              name="sheetName"
              className="hidden"
              value={tabName ?? ''}
              readOnly
            />
          </div>
          <button
            type="button"
            onClick={handleSearchFile}
            className="col-span-1 flex items-center justify-center gap-2 rounded-r-md border border-solid border-gray-500 bg-green-400/70 px-3 leading-6 transition-colors hover:bg-green-400/50"
          >
            <SearchIcon />
            Parse
          </button>
        </div>
        <button
          type="button"
          onClick={handleClear}
          disabled={!localFile}
          className="cursor-pointer rounded-md bg-red-500/50 p-2 text-center text-lg transition-colors hover:bg-red-500/30 hover:text-red-500"
        >
          <TrashCanIcon />
        </button>
      </div>
      <button
        type="button"
        className="relative flex h-[300px] w-full cursor-pointer items-center justify-center rounded-md border-4 border-dashed border-gray-500 p-4 transition-colors hover:border-gray-500/70"
        {...getDropProperties()}
        onClick={handleClick}
      >
        <div className="text-xl font-semibold">
          {localFile ? (
            <div className="flex w-full flex-col text-base">
              <span>{localFile.name}</span>
              <span>{localFile.size} Bytes</span>
              <span>{new Date(localFile.lastModified).toLocaleString()}</span>
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
          accept={ACCEPTED_FILE_TYPE}
          hidden
        />
      </button>
    </div>
  );
};

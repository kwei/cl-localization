'use client';

import { CloseIcon } from '@/app/components/CloseIcon';
import { UploadIcon } from '@/app/components/UploadIcon';
import { useFileCtx } from '@/app/modify/FileContext';
import { Locale, Locales } from '@/constants';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useCallback, useRef } from 'react';

const ACCEPTED_FILE_TYPE = 'application/json';
const ACCEPTED_FILE_NAME = [
  'de_DE.json',
  'en_US.json',
  'es_ES.json',
  'fr_FR.json',
  'it_IT.json',
  'ja_JP.json',
  'ko_KR.json',
  'zh_CN.json',
  'zh_TW.json',
];
const FILE_NAME_LOCALE_MAP: Record<string, Locale> = {
  'de_DE.json': Locale.DEU,
  'en_US.json': Locale.Default,
  'es_ES.json': Locale.ESP,
  'fr_FR.json': Locale.FRA,
  'it_IT.json': Locale.ITA,
  'ja_JP.json': Locale.JPN,
  'ko_KR.json': Locale.KOR,
  'zh_CN.json': Locale.CHS,
  'zh_TW.json': Locale.CHT,
};

export const FileUploader = () => {
  const { setFile, setOpenSelector } = useFileCtx();
  const inputRef = useRef<HTMLInputElement>(null);
  const { files, getDropProperties, handleOnChange, remove } = useFileUpload((_file) => {
    return _file.type === ACCEPTED_FILE_TYPE &&
      ACCEPTED_FILE_NAME.includes(_file.name)
  }, FILE_NAME_LOCALE_MAP);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleClear = useCallback(() => {
    setFile(null);
  }, [setFile]);

  const handleSelectDataRows = useCallback(() => {
    if (!files) return;
    const existedFiles = Locales.map((locale) => files[locale]).filter(Boolean);
    if (existedFiles.length !== Locales.length) return;
    setOpenSelector(true);
    setFile(files);
  }, [files, setFile, setOpenSelector]);

  const handleRemoveFile = useCallback(
    (locale: Locale) => {
      remove(locale);
    },
    [remove],
  );

  return (
    <div className="col-span-5 flex flex-col gap-4">
      <h3 className="w-full py-2 text-center text-xl font-bold">
        Choose JSON Files
      </h3>
      {!files && (
        <div
          className="relative flex h-[300px] w-full cursor-pointer items-center justify-center rounded-md border-4 border-dashed border-gray-500 p-4 transition-colors hover:border-gray-500/70"
          {...getDropProperties()}
          onClick={handleClick}
        >
          <span className="flex flex-col gap-1 text-xl font-semibold">
            Click to upload or drop the excel!
          </span>
          <input
            ref={inputRef}
            type="file"
            name="file"
            onChange={handleOnChange}
            accept="application/json"
            hidden
          />
        </div>
      )}
      {files && (
        <div className="flex w-full flex-col gap-1" {...getDropProperties()}>
          {Locales.map((locale) => (
            <div
              key={locale}
              className="grid grid-cols-12 divide-x divide-gray-500 rounded-md border border-solid border-gray-500"
            >
              <div className="col-span-2 flex items-center justify-center p-1">
                <span>{locale}</span>
              </div>
              <div className="col-span-8 flex items-center p-1 px-2 text-left">
                <span>{files[locale]?.name}</span>
              </div>
              <div className="col-span-2 flex items-center justify-between">
                {files[locale] ? (
                  <button
                    type="button"
                    title="Remove"
                    onClick={() => handleRemoveFile(locale)}
                    className="flex h-full w-full items-center justify-center rounded-r-md transition-colors hover:bg-red-300/50"
                  >
                    <CloseIcon />
                  </button>
                ) : (
                  <button
                    type="button"
                    title="Upload"
                    onClick={handleClick}
                    className="flex h-full w-full items-center justify-center rounded-r-md transition-colors hover:bg-gray-300/50"
                  >
                    <UploadIcon />
                    <input
                      ref={inputRef}
                      type="file"
                      name="file"
                      onChange={handleOnChange}
                      accept="application/json"
                      hidden
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex w-full items-center gap-2 py-4">
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 cursor-pointer rounded-md bg-red-500/50 px-4 py-2 text-center text-lg transition-colors hover:bg-red-500/30"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleSelectDataRows}
          disabled={!files || Object.keys(files).length !== 9}
          className="flex-1 cursor-pointer rounded-md bg-green-500/50 px-4 py-2 text-center text-lg transition-colors hover:bg-green-500/30"
        >
          Parse
        </button>
      </div>
    </div>
  );
};

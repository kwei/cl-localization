'use client';

import { CheckIcon } from '@/app/components/CheckIcon';
import { SearchIcon } from '@/app/components/SearchIcon';
import { TrashCanIcon } from '@/app/components/TrashCanIcon';
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
const LOCALE_FILE_NAME_MAP: Record<Locale, string> = {
  [Locale.DEU]: 'de_DE.json',
  [Locale.Default]: 'en_US.json',
  [Locale.ESP]: 'es_ES.json',
  [Locale.FRA]: 'fr_FR.json',
  [Locale.ITA]: 'it_IT.json',
  [Locale.JPN]: 'ja_JP.json',
  [Locale.KOR]: 'ko_KR.json',
  [Locale.CHS]: 'zh_CN.json',
  [Locale.CHT]: 'zh_TW.json',
};

export const FileUploader = () => {
  const { setFile, setOpenSelector } = useFileCtx();
  const inputRef = useRef<HTMLInputElement>(null);
  const { files, getDropProperties, handleOnChange, remove, clear } =
    useFileUpload((_file) => {
      return (
        _file.type === ACCEPTED_FILE_TYPE &&
        ACCEPTED_FILE_NAME.includes(_file.name)
      );
    }, FILE_NAME_LOCALE_MAP);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleClear = useCallback(() => {
    clear();
    setFile(null);
  }, [clear, setFile]);

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
      <div className="flex w-full items-center justify-end gap-4">
        <div className="grid w-full grid-cols-5">
          <div className="col-span-4"></div>
          <button
            type="button"
            onClick={handleSelectDataRows}
            disabled={!files || Object.keys(files).length !== 9}
            className="col-span-1 flex cursor-pointer items-center gap-2 rounded-md border border-solid border-gray-500 bg-green-500/50 px-3 py-2 text-base leading-6 transition-colors hover:bg-green-500/30 disabled:cursor-default disabled:bg-gray-300"
          >
            <SearchIcon />
            Parse
          </button>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="cursor-pointer rounded-md bg-red-500/50 p-2 text-center text-lg transition-colors hover:bg-red-500/30 hover:text-red-500"
        >
          <TrashCanIcon />
        </button>
      </div>
      <div
        className="relative flex h-[200px] w-full cursor-pointer items-center justify-center rounded-md border-4 border-dashed border-gray-500 p-4 transition-colors hover:border-gray-500/70"
        {...getDropProperties()}
        onClick={handleClick}
      >
        <span className="flex flex-col gap-1 text-xl font-semibold">
          Click to upload or drop the JSON files!
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
      <div className="grid grid-cols-3 gap-2 text-sm">
        {Locales.map((locale) => (
          <div
            key={locale}
            className={`group relative col-span-1 flex items-center gap-1 overflow-hidden rounded-md border border-solid px-2 py-1 transition-all ${files && files[locale] ? 'border-green-500 bg-green-500/30 hover:border-red-500' : 'border-gray-300 bg-gray-300'}`}
          >
            <span className="flex size-4 items-center justify-center rounded-full border border-solid border-black">
              {files && files[locale] && <CheckIcon />}
            </span>
            <span className="font-semibold">
              {LOCALE_FILE_NAME_MAP[locale]}
            </span>
            {files && files[locale] && (
              <button
                type="button"
                onClick={() => handleRemoveFile(locale)}
                className="absolute bottom-0 left-full top-0 flex w-full items-center justify-start gap-2 whitespace-nowrap bg-red-300 px-2 py-1 transition-all group-hover:left-0"
              >
                <TrashCanIcon />
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

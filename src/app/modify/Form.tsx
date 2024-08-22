'use client';

import { BookIcon } from '@/app/components/BookIcon';
import { usePreviewModal } from '@/app/Context/PreviewModalContext';
import { useFileCtx } from '@/app/modify/FileContext';
import { Locale, Locales } from '@/constants';
import { FormEvent, ReactNode, useCallback } from 'react';

export const Form = ({ children }: { children: ReactNode }) => {
  const { originalKeys, selectedRows, newKeys } = useFileCtx();
  const { setData, open } = usePreviewModal();

  const handleOnSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const updatedKeys = selectedRows.map(
        (i) => formData.get(`new-key-${i}`) as string,
      );
      const newKeyList = newKeys.map(
        (_, i) => formData.get(`new-key-${selectedRows.length + i}`) as string,
      );
      const result: Record<string, Record<string, string>> = {
        [Locale.Default]: {},
        [Locale.FRA]: {},
        [Locale.JPN]: {},
        [Locale.DEU]: {},
        [Locale.CHT]: {},
        [Locale.CHS]: {},
        [Locale.KOR]: {},
        [Locale.ITA]: {},
        [Locale.ESP]: {},
      };
      Locales.forEach((locale) => {
        updatedKeys.forEach((key, i) => {
          result[locale][key] = formData.get(
            `${locale}-new-value-${originalKeys[i]}`,
          ) as string;
        });
        newKeyList.forEach((key, i) => {
          result[locale][key] = formData.get(
            `${locale}-new-value-${newKeys[i]}`,
          ) as string;
        });
      });
      setData(result);
      open(true);
    },
    [newKeys, open, originalKeys, selectedRows, setData],
  );

  return (
    <form
      className="flex h-full w-full flex-col justify-between"
      onSubmit={handleOnSubmit}
    >
      {children}
    </form>
  );
};

export const ActionBar = () => {
  const { data } = useFileCtx();

  return (
    <div className="flex w-full flex-row-reverse items-center">
      <button
        type="submit"
        className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-500/70 px-4 py-2 transition-colors hover:bg-blue-500/50"
        disabled={Object.keys(data).length === 0}
      >
        <BookIcon />
        Preview
      </button>
    </div>
  );
};

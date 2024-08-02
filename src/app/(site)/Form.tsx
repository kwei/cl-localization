'use client';

import { useFileCtx } from '@/app/(site)/FileContext';
import { usePreviewModal } from '@/app/Context/PreviewModalContext';
import { Locale } from '@/constants';
import { FormEvent, ReactNode, useCallback, useMemo } from 'react';

export const Form = ({ children }: { children: ReactNode }) => {
  const { rows } = useFileCtx();
  const { setData, open } = usePreviewModal();

  const localeIndex: Record<string, number> = useMemo(() => {
    if (rows.length === 0) {
      return {
        [Locale.Default]: 0,
        [Locale.FRA]: 0,
        [Locale.JPN]: 0,
        [Locale.DEU]: 0,
        [Locale.CHT]: 0,
        [Locale.CHS]: 0,
        [Locale.KOR]: 0,
        [Locale.ITA]: 0,
        [Locale.ESP]: 0,
      };
    }
    const row = rows[0].map((data) => data?.toString());
    return {
      [Locale.Default]: 0,
      [Locale.FRA]: row.indexOf(Locale.FRA),
      [Locale.JPN]: row.indexOf(Locale.JPN),
      [Locale.DEU]: row.indexOf(Locale.DEU),
      [Locale.CHT]: row.indexOf(Locale.CHT),
      [Locale.CHS]: row.indexOf(Locale.CHS),
      [Locale.KOR]: row.indexOf(Locale.KOR),
      [Locale.ITA]: row.indexOf(Locale.ITA),
      [Locale.ESP]: row.indexOf(Locale.ESP),
    };
  }, [rows]);

  const handleOnSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const prefix = formData.get('prefix') as string;
      const newKeys: string[] = [];
      for (let i = 0; i < rows.length - 1; i++) {
        newKeys.push(
          ((prefix !== '' ? prefix.trim() + '.' : '') +
            formData.get(`new-key-${i}`)) as string,
        );
      }
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
      newKeys.forEach((key, i) => {
        Object.keys(localeIndex).forEach((locale) => {
          const index = localeIndex[locale];
          const cell = rows[i + 1][index];
          result[locale][key] = cell ? cell.toString() : '';
        });
      });
      setData(result);
      open(true);
    },
    [setData, open, rows, localeIndex],
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
  const { rows } = useFileCtx();

  return (
    <div className="flex w-full flex-row-reverse items-center">
      <button
        type="submit"
        className="cursor-pointer rounded-md bg-blue-500/70 px-4 py-2 transition-colors hover:bg-blue-500/50"
        disabled={rows.length === 0}
      >
        Preview
      </button>
    </div>
  );
};

'use client';

import { useFileCtx } from '@/app/(site)/FileContext';

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

'use client';

import { CloseIcon } from '@/app/components/CloseIcon';
import { TrashCanIcon } from '@/app/components/TrashCanIcon';
import { useCallback, useMemo, useRef } from 'react';

export const KeyEditBlock = ({
  label,
  index,
  handleOnRemove,
}: {
  label: string;
  index: number;
  handleOnRemove?: (index: number) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const isRemovable = useMemo(() => !!handleOnRemove, [handleOnRemove]);

  const handleClearValue = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  const handleOnRemoveKey = useCallback(() => {
    if (handleOnRemove) handleOnRemove(index);
  }, [handleOnRemove, index]);

  return (
    <div className="group relative grid w-full grid-cols-12 gap-1 text-sm">
      <div
        className={`group/label relative col-span-3 overflow-hidden rounded-md bg-gray-500/70 p-2 transition-colors ${isRemovable ? 'cursor-pointer hover:bg-red-500/70' : ''}`}
      >
        <div
          title={label}
          className={`absolute bottom-2 left-2 right-2 top-2 flex items-center transition-all ${isRemovable ? 'group-hover/label:right-full' : ''}`}
        >
          <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-start">
            {label}
          </span>
        </div>
        <button
          type="button"
          onClick={handleOnRemoveKey}
          className={`absolute bottom-2 left-full right-2 top-2 w-fit transition-all ${isRemovable ? 'group-hover/label:left-2' : ''}`}
        >
          <span className="flex h-full w-full shrink-0 items-center gap-2 whitespace-nowrap">
            <TrashCanIcon />
            Remove Key
          </span>
        </button>
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

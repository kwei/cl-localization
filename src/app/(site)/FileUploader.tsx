'use client';

import { ACCEPTED_FILE_TYPE, useFileUpload } from '@/hooks/useFileUpload';
import { useCallback, useRef } from 'react';

export const FileUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { file, getDropProperties, handleOnChange } = useFileUpload();

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div
      className="relative flex aspect-video w-[500px] cursor-pointer items-center justify-center rounded-md border-4 border-dashed border-gray-500"
      {...getDropProperties()}
      onClick={handleClick}
    >
      <div className="text-xl font-bold">
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
        onChange={handleOnChange}
        accept={ACCEPTED_FILE_TYPE.toString()}
        hidden
      />
    </div>
  );
};

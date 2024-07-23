'use client';
import { ChangeEvent, DragEvent, useCallback, useState } from 'react';

export const ACCEPTED_FILE_TYPE = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleInputFile = useCallback((event: DragEvent) => {
    event.preventDefault();
    const inputs = event.dataTransfer;
    if (!inputs.files || inputs.files.length === 0) return;
    if (ACCEPTED_FILE_TYPE.includes(inputs.files[0].type)) {
      setFile(inputs.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const getDropProperties = useCallback(() => {
    return {
      onDrop: handleInputFile,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
    };
  }, [handleDragLeave, handleDragOver, handleInputFile]);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputs = event.target;
    if (!inputs.files || inputs.files.length === 0) return;
    if (ACCEPTED_FILE_TYPE.includes(inputs.files[0].type)) {
      setFile(inputs.files[0]);
    }
  }, []);

  return { file, getDropProperties, handleOnChange };
};

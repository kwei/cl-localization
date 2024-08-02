'use client';
import { ChangeEvent, DragEvent, useCallback, useState } from 'react';

export const useFileUpload = (acceptedFileType: string) => {
  const [file, setFile] = useState<File | null>(null);

  const clear = () => setFile(null);

  const handleInputFile = useCallback((event: DragEvent) => {
    event.preventDefault();
    const inputs = event.dataTransfer;
    if (!inputs.files || inputs.files.length === 0) return;
    if (acceptedFileType === inputs.files[0].type) {
      setFile(inputs.files[0]);
    }
  }, [acceptedFileType]);

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
    if (acceptedFileType === inputs.files[0].type) {
      setFile(inputs.files[0]);
    }
  }, [acceptedFileType]);

  return { file, getDropProperties, handleOnChange, clear };
};

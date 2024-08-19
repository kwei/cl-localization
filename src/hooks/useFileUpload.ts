'use client';
import { ChangeEvent, DragEvent, useCallback, useState } from 'react';

export const useFileUpload = (
  validator: (file: File) => boolean,
  fileNameMap?: Record<string, string>,
) => {
  const [files, setFiles] = useState<Record<string, File> | null>(null);

  const clear = () => setFiles(null);

  const handleReadFiles = useCallback(
    (files: FileList) => {
      for (let i = 0; i < files.length; i++) {
        const _file = files[i];
        if (validator(_file)) {
          setFiles((prevState) => {
            if (prevState) {
              if (fileNameMap) {
                return { ...prevState, [fileNameMap[_file.name]]: _file };
              }
              return { ...prevState, _default: _file };
            } else if (fileNameMap) {
              return {
                [fileNameMap[_file.name]]: _file,
              };
            } else {
              return {
                _default: _file,
              };
            }
          });
        }
      }
    },
    [fileNameMap, validator],
  );

  const handleInputFile = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const inputs = event.dataTransfer;
      if (!inputs.files || inputs.files.length === 0) return;
      handleReadFiles(inputs.files);
    },
    [handleReadFiles],
  );

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

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const inputs = event.target;
      if (!inputs.files || inputs.files.length === 0) return;
      handleReadFiles(inputs.files);
    },
    [handleReadFiles],
  );

  const remove = useCallback((key: string) => {
    setFiles((prevState) => {
      const newState = { ...prevState };
      if (prevState) {
        delete newState[key];
      }
      return newState;
    });
  }, []);

  return { files, getDropProperties, handleOnChange, clear, remove };
};

'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import readXlsxFile, { Row } from 'read-excel-file';

export const FileContext = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | Blob | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [sheetName, setSheetName] = useState<string>();

  const ctxVal = useMemo(
    () => ({
      rows,
      setFile,
      setSheetName,
    }),
    [rows],
  );

  useEffect(() => {
    if (file && sheetName) {
      readXlsxFile(file, { sheet: sheetName }).then((data) => {
        setRows(data);
      });
    }
  }, [file, sheetName]);

  return <Ctx.Provider value={ctxVal}>{children}</Ctx.Provider>;
};

const Ctx = createContext<{
  rows: Row[];
  setFile: (file: File | Blob) => void;
  setSheetName: (name: string) => void;
}>({
  rows: [],
  setFile: (file: File | Blob) => {},
  setSheetName: (name: string) => {},
});

export const useFileCtx = () => useContext(Ctx);

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
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const ctxVal = useMemo(
    () => ({
      rows,
      selectedRows,
      setFile,
      setSheetName,
      setSelectedRows,
    }),
    [rows, selectedRows],
  );

  useEffect(() => {
    if (file && sheetName) {
      readXlsxFile(file, { sheet: sheetName }).then((data) => {
        setRows(data);
      });
    } else {
      setRows([]);
      setSelectedRows([]);
    }
  }, [file, sheetName]);

  return <Ctx.Provider value={ctxVal}>{children}</Ctx.Provider>;
};

const Ctx = createContext<{
  rows: Row[];
  selectedRows: number[];
  setFile: (file: File | Blob | null) => void;
  setSheetName: (name: string) => void;
  setSelectedRows: (rows: number[]) => void;
}>({
  rows: [],
  selectedRows: [],
  setFile: (_file: File | Blob | null) => {},
  setSheetName: (_name: string) => {},
  setSelectedRows: (_rows: number[]) => {},
});

export const useFileCtx = () => useContext(Ctx);

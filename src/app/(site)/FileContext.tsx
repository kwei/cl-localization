'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import readXlsxFile, { readSheetNames, Row } from 'read-excel-file';

export const FileContext = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | Blob | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [openSelector, setOpenSelector] = useState<boolean>(false);
  const [sheetName, setSheetName] = useState<string>();
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const ctxVal = useMemo(
    () => ({
      rows,
      sheetNames,
      selectedRows,
      openSelector,
      setFile,
      setSheetName,
      setSelectedRows,
      setOpenSelector: (flag: boolean) => setOpenSelector(flag),
    }),
    [openSelector, rows, selectedRows, sheetNames],
  );

  useEffect(() => {
    if (file) {
      readSheetNames(file).then((sheetNames) => {
        setSheetNames(sheetNames);
      });
    } else {
      setSheetNames([]);
    }
  }, [file]);

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
  sheetNames: string[];
  selectedRows: number[];
  openSelector: boolean;
  setFile: (file: File | Blob | null) => void;
  setSheetName: (name: string) => void;
  setSelectedRows: (rows: number[]) => void;
  setOpenSelector: (flag: boolean) => void;
}>({
  rows: [],
  sheetNames: [],
  selectedRows: [],
  openSelector: false,
  setFile: (_file: File | Blob | null) => {},
  setSheetName: (_name: string) => {},
  setSelectedRows: (_rows: number[]) => {},
  setOpenSelector: (_flag: boolean) => {},
});

export const useFileCtx = () => useContext(Ctx);

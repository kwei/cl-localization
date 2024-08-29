'use client';

import { Locale } from '@/constants';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const FileContext = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<
    Record<string, File> | Record<string, Blob> | null
  >(null);
  const [data, setData] = useState<Record<string, Record<string, string>>>({});
  const [openSelector, setOpenSelector] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [newKeys, setNewKeys] = useState<string[]>([]);
  const [newValues, setNewValues] = useState<Record<string, string>>({});
  const [updatedOriginalKeys, setUpdatedOriginalKeys] = useState<string[]>([]);
  const [updatedNewKeys, setUpdatedNewKeys] = useState<string[]>([]);

  const originalKeys = useMemo(
    () => selectedRows.map((i) => Object.keys(data[Locale.Default])[i]),
    [data, selectedRows],
  );

  const ctxVal = useMemo(
    () => ({
      data,
      originalKeys,
      newKeys,
      selectedRows,
      newValues,
      openSelector,
      updatedOriginalKeys,
      updatedNewKeys,
      setFile,
      setNewKeys,
      setNewValues,
      setSelectedRows,
      setOpenSelector: (flag: boolean) => setOpenSelector(flag),
      setUpdatedOriginalKeys,
      setUpdatedNewKeys,
    }),
    [
      data,
      originalKeys,
      newKeys,
      selectedRows,
      newValues,
      openSelector,
      updatedOriginalKeys,
      updatedNewKeys,
    ],
  );

  useEffect(() => {
    if (file && Object.keys(file).length === 9) {
      const tmp: Record<string, Record<string, string>> = {};
      Promise.all(
        Object.keys(file).map((key) =>
          parseJsonFile(file[key]).then((_data) => {
            tmp[key] = _data;
          }),
        ),
      ).then(() => {
        setData(tmp);
      });
    } else {
      setData({});
      setSelectedRows([]);
    }
  }, [file]);

  return <Ctx.Provider value={ctxVal}>{children}</Ctx.Provider>;
};

async function parseJsonFile(
  file: File | Blob,
): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      if (
        event.target &&
        event.target.result &&
        typeof event.target.result === 'string'
      ) {
        resolve(JSON.parse(event.target.result));
      }
    };
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
}

const Ctx = createContext<{
  data: Record<string, Record<string, string>>;
  originalKeys: string[];
  newKeys: string[];
  newValues: Record<string, string>;
  selectedRows: number[];
  openSelector: boolean;
  updatedOriginalKeys: string[];
  updatedNewKeys: string[];
  setFile: (file: Record<string, File> | Record<string, Blob> | null) => void;
  setSelectedRows: (rows: number[]) => void;
  setOpenSelector: (flag: boolean) => void;
  setNewKeys: Dispatch<SetStateAction<string[]>>;
  setNewValues: Dispatch<SetStateAction<Record<string, string>>>;
  setUpdatedOriginalKeys: Dispatch<SetStateAction<string[]>>;
  setUpdatedNewKeys: Dispatch<SetStateAction<string[]>>;
}>({
  data: {},
  originalKeys: [],
  newKeys: [],
  newValues: {},
  selectedRows: [],
  openSelector: false,
  updatedOriginalKeys: [],
  updatedNewKeys: [],
  setFile: (_file: Record<string, File> | Record<string, Blob> | null) => {},
  setSelectedRows: (_rows: number[]) => {},
  setOpenSelector: (_flag: boolean) => {},
  setNewKeys: () => {},
  setNewValues: () => {},
  setUpdatedOriginalKeys: () => {},
  setUpdatedNewKeys: () => {},
});

export const useFileCtx = () => useContext(Ctx);

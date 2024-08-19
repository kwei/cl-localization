'use client';

import {
  createContext,
  ReactNode,
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

  const ctxVal = useMemo(
    () => ({
      data,
      selectedRows,
      openSelector,
      setFile,
      setSelectedRows,
      setOpenSelector: (flag: boolean) => setOpenSelector(flag),
    }),
    [openSelector, data, selectedRows],
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
  selectedRows: number[];
  openSelector: boolean;
  setFile: (file: Record<string, File> | Record<string, Blob> | null) => void;
  setSelectedRows: (rows: number[]) => void;
  setOpenSelector: (flag: boolean) => void;
}>({
  data: {},
  selectedRows: [],
  openSelector: false,
  setFile: (_file: Record<string, File> | Record<string, Blob> | null) => {},
  setSelectedRows: (_rows: number[]) => {},
  setOpenSelector: (_flag: boolean) => {},
});

export const useFileCtx = () => useContext(Ctx);

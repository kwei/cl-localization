'use client';

import { KeyEditBlock } from '@/app/components/KeyEditorBlock';
import { PlusIcon } from '@/app/components/PlusIcon';
import { Switch } from '@/app/components/Switch';
import { useFileCtx } from '@/app/modify/FileContext';
import { Locale, Locales } from '@/constants';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

export const Editor = () => {
  const [isEditKey, setIsEditKey] = useState(false);

  const handleChangeEditType = (flag: boolean) => {
    setIsEditKey(flag);
  };

  return (
    <div className="col-span-7 flex flex-col gap-4">
      <h3 className="flex w-full items-center justify-center text-xl font-bold">
        <Switch
          onChange={handleChangeEditType}
          falseLabel="Edit Value"
          bridgeLabel="or"
          trueLabel="Edit Key"
        />
      </h3>
      <AddNewKey />
      <div className="flex min-h-[300px] w-full flex-1 flex-col gap-6 rounded-md border-4 border-dashed border-gray-500 p-4 transition-colors hover:border-gray-500/70">
        <EditKey isShow={isEditKey} />
        <EditValue isShow={!isEditKey} />
      </div>
    </div>
  );
};

const AddNewKey = () => {
  const { setNewKeys, newKeys } = useFileCtx();
  const [newKey, setNewKey] = useState('');
  const [keyExists, setKeyExists] = useState(false);

  const handleOnChange = (event: ChangeEvent) => {
    setNewKey((event.target as HTMLInputElement).value.trim());
  };

  const handleSetNewKeys = useCallback(() => {
    const newKeySet = new Set<string>(newKeys);
    if (newKeySet.has(newKey)) setKeyExists(true);
    else {
      setNewKeys(Array.from(newKeySet.add(newKey)));
      setNewKey('');
    }
  }, [newKeys, newKey, setNewKeys]);

  return (
    <div className="relative flex w-full items-center divide-x divide-gray-500 rounded-md border border-solid border-gray-500 bg-transparent">
      <label className="px-4 py-2 font-semibold">New Key</label>
      <input
        type="text"
        className="flex-1 bg-transparent p-2 focus:outline-0"
        value={newKey}
        onChange={handleOnChange}
        onFocus={() => setKeyExists(false)}
      />
      <button
        type="button"
        onClick={handleSetNewKeys}
        className="flex h-full items-center justify-center gap-2 rounded-r-md bg-gray-500/30 px-2 pr-3 font-semibold transition-colors hover:bg-gray-500/10"
      >
        <PlusIcon />
        Add
      </button>
      <span className="absolute left-2 top-full text-sm text-red-500">
        {keyExists && `Key "${newKey}" is Existed.`}
      </span>
    </div>
  );
};

const EditKey = ({ isShow }: { isShow: boolean }) => {
  const { data, selectedRows, newKeys, setNewKeys } = useFileCtx();

  const defaultData = useMemo(() => data[Locale.Default], [data]);

  const selectedKeys = useMemo(() => {
    const res: string[] = [];
    if (!defaultData) return [];
    Object.keys(defaultData).forEach((key, i) => {
      if (selectedRows.includes(i)) res.push(key);
    });
    return res;
  }, [defaultData, selectedRows]);

  const handleOnRemoveKey = useCallback(
    (index: number) => {
      const i = index - selectedKeys.length;
      setNewKeys((prevState) => {
        const newState = [...prevState];
        newState.splice(i, 1);
        return newState;
      });
    },
    [selectedKeys.length, setNewKeys],
  );

  return (
    <div
      className={`flex w-full flex-1 flex-col gap-1 ${isShow ? '' : 'hidden'}`}
    >
      {selectedKeys.map((key, i) => (
        <KeyEditBlock key={key} label={key} index={selectedRows[i]} />
      ))}
      {newKeys.map((key, i) => (
        <KeyEditBlock
          key={key}
          label={key}
          index={selectedKeys.length + i}
          handleOnRemove={handleOnRemoveKey}
        />
      ))}
    </div>
  );
};

const EditValue = ({ isShow }: { isShow: boolean }) => {
  const { data, newKeys, selectedRows } = useFileCtx();

  const hasData = useMemo(() => Object.keys(data).length === 9, [data]);

  return (
    <div
      className={`flex w-full flex-1 flex-col gap-1 ${isShow ? '' : 'hidden'}`}
    >
      {hasData &&
        Locales.map((locale) => (
          <fieldset key={locale} className="flex flex-col gap-1 pb-4 pt-2">
            <legend className="font-bold">{locale}</legend>
            <EditValueBlock
              locale={locale}
              data={data[locale]}
              selectedRows={selectedRows}
            />
            {newKeys.map((key) => (
              <EditValueBlock locale={locale} key={key} data={{ [key]: '' }} />
            ))}
          </fieldset>
        ))}
    </div>
  );
};

const EditValueBlock = ({
  data,
  selectedRows,
  locale,
}: {
  data: Record<string, string>;
  locale: string;
  selectedRows?: number[];
}) => {
  const filteredData = useMemo(() => {
    const res: Record<string, string> = {};
    Object.keys(data).forEach((key, i) => {
      if (!selectedRows || selectedRows.includes(i)) {
        res[key] = data[key];
      }
    });
    return res;
  }, [data, selectedRows]);

  return (
    <div className="flex w-full flex-col gap-1">
      {Object.keys(filteredData).map((key) => (
        <div
          key={key}
          className="flex w-full items-center divide-x divide-gray-500 rounded border border-solid border-gray-500 bg-gray-50"
        >
          <label
            title={key}
            className="w-[200px] overflow-hidden text-ellipsis rounded-l bg-gray-300 px-2 py-1"
          >
            {key}
          </label>
          <input
            type="text"
            name={`${locale}-new-value-${key}`}
            className="flex-1 border-0 bg-transparent px-2 py-1 focus:outline-0"
            defaultValue={filteredData[key]}
          />
        </div>
      ))}
    </div>
  );
};

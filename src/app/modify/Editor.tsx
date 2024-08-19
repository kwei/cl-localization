'use client';

import { KeyEditBlock } from '@/app/components/KeyEditorBlock';
import { Switch } from '@/app/components/Switch';
import { useFileCtx } from '@/app/modify/FileContext';
import { Locale } from '@/constants';
import { useMemo, useState } from 'react';

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
      <div className="flex min-h-[300px] w-full flex-1 flex-col gap-1 overflow-y-auto rounded-md border-4 border-dashed border-gray-500 p-4 transition-colors hover:border-gray-500/70">
        {isEditKey ? <EditKey /> : <EditValue />}
      </div>
    </div>
  );
};

const EditKey = () => {
  const { data, selectedRows } = useFileCtx();

  const defaultData = useMemo(() => data[Locale.Default], [data]);
  const selectedKeys = useMemo(() => {
    const res: string[] = [];
    if (!defaultData) return [];
    Object.keys(defaultData).forEach((key, i) => {
      if (selectedRows.includes(i)) res.push(key);
    });
    return res;
  }, [defaultData, selectedRows]);

  return (
    <>
      {selectedKeys.map((key, i) => (
        <KeyEditBlock key={key} label={key} index={i} />
      ))}
    </>
  );
};

const EditValue = () => {
  const { data, selectedRows } = useFileCtx();

  return <>Coming Soon!</>;
};

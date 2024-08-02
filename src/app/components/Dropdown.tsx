'use client';

import { CaretDownFillIcon } from '@/app/components/CaretDownFillIcon';
import { useFocusRef } from '@/hooks/useFocusRef';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface Props {
  className?: string;
  value?: string;
  placeholder?: string;
  children: ReactNode;
  onChange?: (value: string) => void;
}

interface CtxVal {
  value: string;
  setValue: (value: string) => void;
  close: () => void;
}

const initCtxVal = {
  value: '',
  setValue: (_value: string) => {},
  close: () => {},
};

export const Dropdown = (props: Props) => {
  const {
    className = '',
    value,
    placeholder = 'Select One',
    children,
    onChange,
  } = props;
  const [selected, setSelected] = useState(value ?? '');
  const [open, setOpen] = useState(false);
  const ref = useFocusRef<HTMLDivElement>(() => {
    setOpen(false);
  });

  const handleOnChange = useCallback(
    (val: string) => {
      setSelected(val);
      if (onChange) onChange(val);
    },
    [onChange],
  );

  const ctxVal = useMemo(
    () => ({
      value: selected,
      setValue: handleOnChange,
      close: () => setOpen(false),
    }),
    [handleOnChange, selected],
  );

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prevState) => !prevState)}
        className={`peer ${className} flex w-full items-center justify-between gap-4 font-semibold`}
      >
        <span>{value ?? placeholder}</span>
        <CaretDownFillIcon />
      </button>
      <div
        className={`absolute left-0 right-0 top-full z-30 mt-1 grid transition-all ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <Ctx.Provider value={ctxVal}>
          <div className="overflow-hidden">{children}</div>
        </Ctx.Provider>
      </div>
    </div>
  );
};

const Ctx = createContext<CtxVal>(initCtxVal);

export const DropdownOption = ({
  value,
  label,
  className = '',
}: {
  value: string;
  label: string;
  className?: string;
}) => {
  const { setValue, close } = useContext(Ctx);

  const handleOnSelect = useCallback(() => {
    setValue(value);
    close();
  }, [close, setValue, value]);

  return (
    <button type="button" onClick={handleOnSelect} className={className}>
      {label}
    </button>
  );
};

'use client';

import { CaretDownFillIcon } from '@/app/components/CaretDownFillIcon';
import { useFocusRef } from '@/hooks/useFocusRef';
import {
  ChangeEvent,
  createContext,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface Props {
  className?: string;
  value?: string;
  placeholder?: string;
  children: ReactNode;
  onChange?: (value: string) => void;
  searchable?: boolean;
}

interface CtxVal {
  value: string;
  search: string;
  setValue: (value: string) => void;
  close: () => void;
}

const initCtxVal = {
  value: '',
  search: '',
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
    searchable = false,
  } = props;
  const [selected, setSelected] = useState(value ?? '');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [typing, setTyping] = useState(false);
  const ref = useFocusRef<HTMLDivElement>(() => {
    setOpen(false);
    setTyping(false);
  });

  const handleOnChange = useCallback(
    (val: string) => {
      setSelected(val);
      if (onChange) onChange(val);
      setSearch('');
    },
    [onChange],
  );

  const handleOnClick = useCallback(() => {
    if (typing) {
      setOpen(true);
    } else {
      setOpen((prevState) => !prevState);
    }
  }, [typing]);

  const handleSearchTabName = useCallback((event: ChangeEvent) => {
    setSearch((event.target as HTMLInputElement).value ?? '');
  }, []);

  const ctxVal = useMemo(
    () => ({
      value: selected,
      search,
      setValue: handleOnChange,
      close: () => setOpen(false),
    }),
    [handleOnChange, search, selected],
  );

  useEffect(() => {
    if (search !== '') {
      setSelected('');
      if (onChange) onChange('');
    }
  }, [onChange, search]);

  return (
    <div ref={ref} className="relative inline-block w-full">
      <button
        type="button"
        onClick={handleOnClick}
        className={`peer ${className} flex w-full items-center justify-between gap-4 font-semibold`}
      >
        {searchable ? (
          <input
            type="text"
            className="bg-transparent focus:outline-0"
            placeholder={placeholder}
            value={search || value}
            onChange={handleSearchTabName}
            onFocus={() => setTyping(true)}
          />
        ) : (
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {value ?? placeholder}
          </span>
        )}
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
  children,
  className = '',
  closeOnSelect = true,
  ...legacy
}: {
  value: string;
  label?: string;
  children?: ReactNode;
  className?: string;
  closeOnSelect?: boolean;
} & HTMLAttributes<HTMLButtonElement>) => {
  const { setValue, close, search } = useContext(Ctx);

  const handleOnSelect = useCallback(() => {
    setValue(value);
    if (closeOnSelect) close();
  }, [close, closeOnSelect, setValue, value]);

  if (label && !label.includes(search)) return null;

  return (
    <button
      type="button"
      {...legacy}
      onClick={handleOnSelect}
      className={className}
    >
      {label ?? children}
    </button>
  );
};

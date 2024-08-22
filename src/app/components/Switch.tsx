'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  onChange: (value: boolean) => void;
  className?: string;
  falseLabel?: string;
  trueLabel?: string;
  bridgeLabel?: string;
  defaultStatus?: boolean;
}

export const Switch = (props: Props) => {
  const {
    className = '',
    falseLabel = 'False',
    trueLabel = 'True',
    bridgeLabel = '',
    onChange,
    defaultStatus = false,
  } = props;
  const [flag, setFlag] = useState(defaultStatus);
  const [labelWidth, setLabelWidth] = useState('auto');
  const [leftWidth, setLeftWidth] = useState('0px');
  const falseRef = useRef<HTMLSpanElement>(null);
  const bridgeRef = useRef<HTMLSpanElement>(null);
  const trueRef = useRef<HTMLSpanElement>(null);

  const handleOnClick = () => {
    setFlag((prevState) => !prevState);
  };

  useEffect(() => {
    const leftLabelWidth = falseRef.current?.getBoundingClientRect().width ?? 0;
    const bridgeLabelWidth =
      bridgeRef.current?.getBoundingClientRect().width ?? 0;
    setLeftWidth(leftLabelWidth + bridgeLabelWidth + 4 + 'px');
  }, []);

  useEffect(() => {
    onChange(flag);
    let el = flag ? trueRef.current : falseRef.current;
    const width = el?.getBoundingClientRect().width;
    setLabelWidth(width ? width + 'px' : 'auto');
  }, [flag, onChange]);

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={`${className} relative flex items-center justify-between rounded-md bg-gray-500 p-1`}
    >
      <span
        className="absolute bottom-1 top-1 z-10 rounded bg-gray-200 transition-all"
        style={{
          width: labelWidth,
          left: flag ? leftWidth : '4px',
        }}
      ></span>
      <span
        ref={falseRef}
        className={`z-20 px-2 py-1 transition-all ${flag ? '' : 'bg-gradient-selected bg-clip-text text-transparent'}`}
      >
        {falseLabel}
      </span>
      <span ref={bridgeRef} className="z-20 p-1">
        {bridgeLabel}
      </span>
      <span
        ref={trueRef}
        className={`z-20 px-2 py-1 transition-all ${flag ? 'bg-gradient-selected bg-clip-text text-transparent' : ''}`}
      >
        {trueLabel}
      </span>
    </button>
  );
};

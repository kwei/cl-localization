"use client";

import { CloseIcon } from "@/app/components/CloseIcon";
import { useRef } from "react";

export const KeyEditBlock = ({ label, index }: { label: string; index: number }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClearValue = () => {
		if (!inputRef.current) return;
		inputRef.current.value = '';
	};

	return (
		<div className="group relative grid w-full grid-cols-12 gap-1">
			<div className="col-span-3 break-words rounded-md bg-gray-500/70 p-2">
				{label}
			</div>
			<input
				type="text"
				ref={inputRef}
				name={`new-key-${index.toString()}`}
				className="col-span-9 rounded-md border border-solid border-gray-500 bg-transparent p-2 pr-8 focus:outline-0"
				defaultValue={label}
			/>
			<button
				type="button"
				onClick={handleClearValue}
				className="invisible absolute right-2 top-2 flex size-6 origin-center items-center justify-center rounded-full p-1 text-red-500 transition-all hover:bg-red-500/20 group-hover:visible"
			>
				<CloseIcon />
			</button>
		</div>
	);
};
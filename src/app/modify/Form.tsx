'use client';

import { useFileCtx } from "@/app/modify/FileContext";
import { usePreviewModal } from "@/app/Context/PreviewModalContext";
import { FormEvent, ReactNode, useCallback } from "react";

export const Form = ({ children }: { children: ReactNode }) => {
	const { data, selectedRows } = useFileCtx();
	const { setData, open } = usePreviewModal();

	const handleOnSubmit = useCallback(
		(event: FormEvent) => {
			event.preventDefault();
			const formData = new FormData(event.target as HTMLFormElement);
			// const newKeys: string[] = [];
			// selectedRows.forEach((_, i) => {
			// 	newKeys.push(
			// 		((prefix !== '' ? prefix.trim() + '.' : '') +
			// 			formData.get(`new-key-${i}`)) as string,
			// 	);
			// });
			// const result: Record<string, Record<string, string>> = {
			// 	[Locale.Default]: {},
			// 	[Locale.FRA]: {},
			// 	[Locale.JPN]: {},
			// 	[Locale.DEU]: {},
			// 	[Locale.CHT]: {},
			// 	[Locale.CHS]: {},
			// 	[Locale.KOR]: {},
			// 	[Locale.ITA]: {},
			// 	[Locale.ESP]: {},
			// };
			// setData(result);
			// open(true);
		},
		[selectedRows, setData, open],
	);

	return (
		<form
			className="flex h-full w-full flex-col justify-between"
			onSubmit={handleOnSubmit}
		>
			{children}
		</form>
	);
}


export const ActionBar = () => {
	const { data } = useFileCtx();

	return (
		<div className="flex w-full flex-row-reverse items-center">
			<button
				type="submit"
				className="cursor-pointer rounded-md bg-blue-500/70 px-4 py-2 transition-colors hover:bg-blue-500/50"
				disabled={Object.keys(data).length === 0}
			>
				Preview
			</button>
		</div>
	);
};
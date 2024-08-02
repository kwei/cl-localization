import { FileContext } from '@/app/(site)/FileContext';
import { FileUploader } from '@/app/(site)/FileUploader';
import * as Editor from '@/app/(site)/Form';
import { KeyEditor } from '@/app/(site)/KeyEditor';
import { SelectorModal } from '@/app/(site)/SelectorModal';
import { PreviewModalContext } from '@/app/Context/PreviewModalContext';

export default function Home() {
  return (
    <main className="flex w-full flex-1 items-center justify-center pb-8">
      <div className="h-full w-full max-w-[1280px]">
        <PreviewModalContext>
          <FileContext>
            <Editor.Form>
              <h1 className="w-full py-4 text-center text-3xl font-bold text-black">
                Convert Excel to JSON by Locale
              </h1>
              <div className="grid w-full grid-cols-12 gap-4 py-4">
                <SelectorModal>
                  <FileUploader />
                  <KeyEditor />
                </SelectorModal>
              </div>
              <Editor.ActionBar />
            </Editor.Form>
          </FileContext>
        </PreviewModalContext>
      </div>
    </main>
  );
}

import { PreviewModalContext } from '@/app/Context/PreviewModalContext';
import { Editor } from '@/app/modify/Editor';
import { FileContext } from '@/app/modify/FileContext';
import { FileUploader } from '@/app/modify/FileUploader';
import * as FormHandler from '@/app/modify/Form';
import { SelectorModal } from '@/app/modify/SelectorModal';

export default function Home() {
  return (
    <main className="flex w-full flex-1 items-center justify-center px-6 pb-8">
      <div className="h-full w-full max-w-[1280px]">
        <PreviewModalContext>
          <FileContext>
            <FormHandler.Form>
              <h1 className="w-full py-4 text-center text-3xl font-bold text-black">
                Coming Soon!
              </h1>
              <div className="grid w-full grid-cols-12 gap-4 py-4">
                <SelectorModal>
                  <FileUploader />
                  <Editor />
                </SelectorModal>
              </div>
              <FormHandler.ActionBar />
            </FormHandler.Form>
          </FileContext>
        </PreviewModalContext>
      </div>
    </main>
  );
}

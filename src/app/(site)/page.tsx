import { FileContext } from '@/app/(site)/FileContext';
import { FileUploader } from '@/app/(site)/FileUploader';
import * as Editor from '@/app/(site)/Form';
import { KeyEditor } from '@/app/(site)/KeyEditor';
import { SelectorModal } from '@/app/(site)/SelectorModal';
import { UserManual } from '@/app/components/UserManual';
import { PreviewModalContext } from '@/app/Context/PreviewModalContext';

export default function Home() {
  return (
    <main className="flex w-full flex-1 justify-center px-6 pb-8">
      <div className="w-full max-w-[1280px] flex-1">
        <PreviewModalContext>
          <FileContext>
            <Editor.Form>
              <div className="flex w-full flex-1 flex-col items-center">
                <h1 className="relative w-full pb-4 pt-8 text-center text-2xl font-bold text-black md:text-3xl">
                  Convert Excel to JSON by Locale
                  <div className="absolute right-0 top-2 text-sm">
                    <UserManual>
                      <ol className="flex list-decimal flex-col gap-2 px-6 pl-10 text-start">
                        <li>
                          Upload the excel with the localization which you want
                          to convert to json.
                        </li>
                        <li>
                          Choose the tab name of the excel, then click the parse
                          button.
                        </li>
                        <li>
                          Select the rows that you want to use in the upcoming
                          popup.
                        </li>
                        <li>
                          Edit the keys of the rows you selected, also you can
                          set a prefix key to apply on to the each key.
                        </li>
                        <li>
                          Click <strong>Preview</strong> button to get the
                          result of the conversion.
                        </li>
                      </ol>
                    </UserManual>
                  </div>
                </h1>
                <div className="grid w-full flex-1 grid-cols-12 gap-4 py-4">
                  <SelectorModal>
                    <FileUploader />
                    <KeyEditor />
                  </SelectorModal>
                </div>
              </div>
              <Editor.ActionBar />
            </Editor.Form>
          </FileContext>
        </PreviewModalContext>
      </div>
    </main>
  );
}

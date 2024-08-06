import { FileContext } from '@/app/(site)/FileContext';
import { FileUploader } from '@/app/(site)/FileUploader';
import * as Editor from '@/app/(site)/Form';
import { KeyEditor } from '@/app/(site)/KeyEditor';
import { SelectorModal } from '@/app/(site)/SelectorModal';
import { UserManual } from '@/app/components/UserManual';
import { PreviewModalContext } from '@/app/Context/PreviewModalContext';

export default function Home() {
  return (
    <main className="flex w-full flex-1 items-center justify-center px-6 pb-8">
      <div className="h-full w-full max-w-[1280px]">
        <PreviewModalContext>
          <FileContext>
            <Editor.Form>
              <h1 className="w-full py-4 text-center text-3xl font-bold text-black">
                Convert Excel to JSON by Locale
              </h1>
              <UserManual>
                <ol className="flex list-decimal flex-col gap-2 px-6 pl-10">
                  <li>
                    Upload the excel with the localization which you want to
                    convert to json.
                  </li>
                  <li>
                    Choose the tab name of the excel, then click the search
                    button.
                  </li>
                  <li>
                    Select the rows that you want to use in the upcoming popup.
                  </li>
                  <li>
                    Edit the keys of the rows you selected, also you can set a
                    prefix key to apply on to the each key.
                  </li>
                  <li>
                    Click <strong>Preview</strong> button to get the result of
                    the conversion.
                  </li>
                </ol>
              </UserManual>
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

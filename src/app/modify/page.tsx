import { UserManual } from '@/app/components/UserManual';
import { PreviewModalContext } from '@/app/Context/PreviewModalContext';
import { Editor } from '@/app/modify/Editor';
import { FileContext } from '@/app/modify/FileContext';
import { FileUploader } from '@/app/modify/FileUploader';
import * as FormHandler from '@/app/modify/Form';
import { SelectorModal } from '@/app/modify/SelectorModal';

export default function Home() {
  return (
    <main className="flex w-full flex-1 justify-center px-6 pb-8">
      <div className="h-full w-full max-w-[1280px]">
        <PreviewModalContext>
          <FileContext>
            <FormHandler.Form>
              <h1 className="relative w-full pb-4 pt-8 text-center text-2xl font-bold text-black md:text-3xl">
                Modify Existed JSON by Locale
                <div className="absolute right-0 top-2 text-sm font-normal">
                  <UserManual>
                    <ol className="flex list-decimal flex-col gap-2 px-6 pl-10 text-start">
                      <li>
                        Upload the localization JSON file with the localization
                        which you want to modify.
                      </li>
                      <li>
                        After all JSON files uploaded, Click the parse button.
                      </li>
                      <li>
                        Select the key that you want to use in the upcoming
                        popup.
                      </li>
                      <li>
                        Edit the keys or update the corresponding values, also
                        you can add new key with new value.
                      </li>
                      <li>
                        Click <strong>Preview</strong> button to get the result
                        of the conversion.
                      </li>
                    </ol>
                  </UserManual>
                </div>
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

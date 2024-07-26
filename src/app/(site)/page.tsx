import { ActionBar } from '@/app/(site)/ActionBar';
import { FileContext } from '@/app/(site)/FileContext';
import { FileUploader } from '@/app/(site)/FileUploader';
import { Form } from '@/app/(site)/Form';
import { KeyEditor } from '@/app/(site)/KeyEditor';
import { PreviewModalContext } from '@/app/(site)/PreviewModalContext';
import { Header } from '@/app/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex w-full flex-1 items-center justify-center">
        <div className="w-full max-w-[1280px]">
          <PreviewModalContext>
            <FileContext>
              <Form>
                <div className="grid w-full grid-cols-12 gap-4 py-4">
                  <FileUploader />
                  <KeyEditor />
                </div>
                <ActionBar />
              </Form>
            </FileContext>
          </PreviewModalContext>
        </div>
      </main>
    </>
  );
}

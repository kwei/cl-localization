import { FileUploader } from '@/app/(site)/FileUploader';
import { Header } from '@/app/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex w-full flex-1 flex-col items-center justify-between">
        <div className="flex w-full gap-4 py-4">
          <FileUploader />
        </div>
        <div className="flex w-full gap-4 py-4"></div>
      </main>
    </>
  );
}

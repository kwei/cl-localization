import { PreviewModalContext } from '@/app/Context/PreviewModalContext';

export default function Home() {
  return (
    <main className="flex w-full flex-1 items-center justify-center">
      <div className="h-full w-full max-w-[1280px]">
        <PreviewModalContext>
          <h1 className="w-full py-4 text-center text-3xl font-bold text-black">
            Coming Soon!
          </h1>
        </PreviewModalContext>
      </div>
    </main>
  );
}

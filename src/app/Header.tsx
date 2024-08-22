import { GithubIcon } from '@/app/components/GithubIcon';
import { LinkBtn } from '@/app/components/LinkBtn';
import Link from 'next/link';
import { ReactNode } from 'react';

export const Header = () => {
  return (
    <div className="sticky top-0 z-40 flex w-full flex-col">
      <div className="w-full bg-gradient-main pt-1"></div>
      <nav className="flex w-full items-center justify-center bg-white/50 p-4 backdrop-blur-md md:px-8">
        <div className="flex w-full max-w-[1280px] items-center justify-between">
          <div className="flex w-full items-center gap-4">
            <Link
              href="/"
              className="bg-gradient-main bg-clip-text text-2xl font-black text-transparent max-md:hidden"
            >
              Localization Tool
            </Link>
            <Link
              href="/"
              className="bg-gradient-main bg-clip-text text-2xl font-black text-transparent md:hidden"
            >
              LT
            </Link>
            <div className="flex flex-1 items-center gap-4 px-4 max-md:hidden">
              <LinkBtn href="/">Convert Excel</LinkBtn>
              <LinkBtn href="/modify">Modify JSON</LinkBtn>
            </div>
          </div>
          <SpecialBtn href="https://github.com/kwei/cl-localization">
            <GithubIcon />
            Repo
          </SpecialBtn>
        </div>
      </nav>
      <div className="w-full md:hidden"></div>
    </div>
  );
};

const SpecialBtn = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <a href={href} className="group relative rounded-md bg-gradient-main p-px">
      <div className="flex items-center justify-center rounded-md bg-white">
        <div className="absolute bottom-0 left-full right-0 top-0 rounded-md bg-gradient-main transition-all group-hover:left-0"></div>
        <span className="z-10 flex items-center gap-2 rounded-md px-4 py-1 text-lg font-semibold transition-colors group-hover:text-white">
          {children}
        </span>
      </div>
    </a>
  );
};

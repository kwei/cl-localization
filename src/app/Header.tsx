import { GithubIcon } from '@/app/components/GithubIcon';
import Link from 'next/link';
import { ReactNode } from 'react';

export const Header = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="bg-gradient-main w-full pt-1"></div>
      <nav className="flex w-full items-center justify-center rounded-lg bg-white/50 px-8 py-4 backdrop-blur-md">
        <div className="flex w-full max-w-[1280px] items-center gap-4">
          <Link
            href="/"
            className="bg-gradient-main bg-clip-text text-2xl font-black text-transparent"
          >
            Localization Tool
          </Link>
          <div className="flex flex-1 items-center gap-4 px-4">
            <LinkBtn href="/">Excel To JSON</LinkBtn>
            <LinkBtn href="/modify">Modify JSON</LinkBtn>
          </div>
          <SpecialBtn href="https://github.com/kwei/cl-localization">
            <GithubIcon />
            Repo
          </SpecialBtn>
        </div>
      </nav>
    </div>
  );
};

const LinkBtn = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <Link
      href={href}
      className="font-semibold transition-colors hover:text-pink-500"
    >
      {children}
    </Link>
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
    <a href={href} className="bg-gradient-main group relative rounded-md p-px">
      <div className="flex items-center justify-center rounded-md bg-white">
        <div className="bg-gradient-main absolute bottom-0 left-full right-0 top-0 rounded-md transition-all group-hover:left-0"></div>
        <span className="z-10 flex items-center gap-2 rounded-md px-4 py-1 text-lg font-semibold transition-colors group-hover:text-white">
          {children}
        </span>
      </div>
    </a>
  );
};

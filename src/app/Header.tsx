import Link from 'next/link';
import { ReactNode } from 'react';

export const Header = () => {
  return (
    <nav className="flex w-full items-center gap-4 rounded-lg bg-white/50 px-8 py-4 backdrop-blur-md">
      <label className="text-lg font-semibold">Convert Type:</label>
      <LinkButton href="/">Excel To JSON</LinkButton>
    </nav>
  );
};

const LinkButton = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="bg-gradient-btn group relative rounded-md p-px"
    >
      <div className="flex items-center justify-center rounded-md bg-white">
        <div className="bg-gradient-btn absolute bottom-0 left-full right-0 top-0 rounded-md transition-all group-hover:left-0"></div>
        <span className="z-10 rounded-md px-4 py-2 text-lg font-semibold">
          {children}
        </span>
      </div>
    </Link>
  );
};

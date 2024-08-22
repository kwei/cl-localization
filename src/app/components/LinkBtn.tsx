'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo } from 'react';

export const LinkBtn = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  const location = usePathname();

  const isCurrentRoute = useMemo(() => location === href, [href, location]);

  return (
    <Link
      href={href}
      className={`px-2 py-1 font-semibold transition-colors ${isCurrentRoute ? 'text-purple-500' : 'hover:text-pink-500'}`}
    >
      {children}
    </Link>
  );
};

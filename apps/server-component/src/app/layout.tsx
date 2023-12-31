'use client';

import './globals.css';
import { Inter } from 'next/font/google';

import { CrossedProvider } from '@crossed/ui';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CrossedProvider defaultTheme={'dark'}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </CrossedProvider>
  );
}

import './resources/style/globals.scss';

import {
  ClerkProvider,
} from '@clerk/nextjs';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { WeaveProviderWrapper } from './resources/contexts/WeaveProviderWrapper';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'newWeaver',
  description:
    'A simple tool for generating weaveing drafts',
  openGraph: { images: ['/og.png'] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
        <WeaveProviderWrapper>
          <main className="grow">{children}</main>
          </WeaveProviderWrapper>
        </body>
      </ClerkProvider>

    </html>
  );
}

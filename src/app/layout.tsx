'use client';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import 'monday-ui-react-core/dist/main.css';
import 'monday-ui-react-core/tokens';
import 'monday-ui-react-core';
import '@storybook/addon-actions';
import '@storybook/addon-links';
import '@storybook/react';
import { NextFont } from 'next/dist/compiled/@next/font';
import dynamic from 'next/dynamic';

// DEFINE GLOBAL FONT
const poppins: NextFont = Poppins({ weight: '300', subsets: ['latin'] });

// DYNAMICALLY IMPORT NoSSRWrapper TO DISABLE SSR
const NoSSRWrapper = dynamic(() => import('../components/NoSSRWrapper'), { ssr: false });

// DEFINE RootLayout COMPONENT
export default function RootLayout({
   children,
 }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <title>Monday.com Candlebox Maker</title>
    </head>
    <body className={poppins.className}>
      <NoSSRWrapper>{children}</NoSSRWrapper>
    </body>
    </html>
  );
}

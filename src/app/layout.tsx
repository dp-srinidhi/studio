import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Chennai Road Watch',
  description: 'A civic reporting web application for managing road infrastructure issues in Chennai.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.0/maps/maps.css" />
        <Script src="https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.0/maps/maps-web.min.js" strategy="beforeInteractive" />
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen bg-background')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import React from 'react';
import { StoreWrapper } from '@/stores/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rental Buddy',
  description: 'A tool for helping you find the right place to rent your next home.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <html lang="en">
          <StoreWrapper>
            <AppRouterCacheProvider>
              <body id="#root" className={inter.className}>
                {children}
              </body>
            </AppRouterCacheProvider>
          </StoreWrapper>
        </html>
      </StyledEngineProvider>
    </React.StrictMode>
  );
}

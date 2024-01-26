'use client';

import { observer } from 'mobx-react-lite';
import { useStores } from '@/hooks/useStores';
import { useCallback } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Link,
  Typography,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Card,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Listings } from './components/Listings';

function Home() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Modify the theme configuration here to include background styles
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          background: {
            default: '#121212',
            paper: '#424242',
          },
          // until flashing issue with auto-adjust is figured out...
          // mode: prefersDarkMode ? 'dark' : 'light',
          // background: {
          //   default: prefersDarkMode ? '#121212' : '#f5f5f5',
          //   paper: prefersDarkMode ? '#424242' : '#ffffff',
        },
      }),
    [prefersDarkMode]
  );

  const { sessionStore } = useStores();

  const handleSignIn = useCallback(sessionStore.signIn, [sessionStore]);
  const handleSignOut = useCallback(sessionStore.signOut, [sessionStore]);
  const currentUser = sessionStore.currentUser;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-full flex justify-center items-center">
        <Card className="flex flex-col items-center w-full max-w-md p-8 bg-paper rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800">
          <Typography variant="h4" gutterBottom className="text-center text-2xl font-bold mb-2">
            Welcome to Rental Buddy
          </Typography>
          <Typography variant="body1" gutterBottom className="text-center mb-4">
            Making browsing apartments in NYC a breeze.
          </Typography>
          {!currentUser && (
            <div className="flex justify-center">
              <Link className="cursor-pointer inline-block" onClick={handleSignIn}>
                <Image
                  className="object-contain"
                  width={220}
                  height={50}
                  alt="Sign in with Google"
                  src={`/sign-in-with-google-${'dark'}-2x.png`}
                />
              </Link>
            </div>
          )}
          {currentUser && (
            <>
              <div className="flex justify-between items-center space-x-2">
                <img className="w-7 h-7 rounded-full" src={currentUser.avatar} />
                <Typography variant="h6" className="text-center my-4">
                  {currentUser.email}
                </Typography>
              </div>
              <Button
                onClick={handleSignOut}
                className="mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"
              >
                Sign out
              </Button>
            </>
          )}
        </Card>
      </div>
      <Container maxWidth="lg">
        <Listings listings={sessionStore.listings} />
      </Container>
    </ThemeProvider>
  );
}

export default observer(Home);

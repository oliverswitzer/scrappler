'use client';

import { observer } from 'mobx-react-lite';
import { useStores } from '@/hooks/useStores';
import { useCallback } from 'react';
import { Container } from '@mui/material';
import { Listings } from './components/Listings';

function Home() {
  const { sessionStore } = useStores();

  const handleSignIn = useCallback(sessionStore.signIn, [sessionStore]);
  const handleSignOut = useCallback(sessionStore.signOut, [sessionStore]);
  const currentUser = sessionStore.currentUser;
  const listings = sessionStore.listings;

  return (
    <Container maxWidth="xl">
      {currentUser && <h1>Logged in as: {currentUser?.email}</h1>}
      {!currentUser && <button onClick={handleSignIn}>Sign in with Google</button>}
      {currentUser && <button onClick={handleSignOut}>Sign out</button>}
      <Listings listings={listings} />
    </Container>
  );
}

export default observer(Home);

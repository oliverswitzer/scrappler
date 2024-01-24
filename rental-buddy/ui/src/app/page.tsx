'use client';

import { observer } from 'mobx-react-lite';
import { Listings } from "./listings";
import { useStores } from "@/hooks/useStores";
import { useCallback, useEffect } from "react";
import { getAuth } from 'firebase/auth';
import { Container } from '@mui/material';

function Home() {
  const {
    sessionStore
  } = useStores();

  const handleSignIn = useCallback(sessionStore.signIn, [sessionStore])
  const handleSignOut = useCallback(sessionStore.signOut, [sessionStore])
  const currentUser = sessionStore.currentUser
  const listings = sessionStore.listings

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

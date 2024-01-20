'use client';

import { observer } from 'mobx-react-lite';
import { Listings } from "./listings";
import { useStores } from "@/hooks/useStores";
import { useCallback } from "react";

function Home() {
  const {
    sessionStore
  } = useStores();

  const handleSignIn = useCallback(sessionStore.logIn, [sessionStore])
  const currentUser = sessionStore.currentUser
  const listings = sessionStore.listings

  return (
    <main>
      {currentUser && <h1>Logged in as: {currentUser?.email}</h1>}
      <button onClick={handleSignIn}>Sign in</button>
      <Listings listings={listings} />
    </main>
  );
}

export default observer(Home);

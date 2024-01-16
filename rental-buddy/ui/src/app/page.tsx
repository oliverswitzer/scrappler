'use client';

import { User } from "firebase/auth";
import { Listing, Neighborhood } from 'rb-shared';
import { Firebase } from '@/firebase';
import { observer } from 'mobx-react-lite';
import { Listings } from "./listings";
import { useStores } from "@/hooks/useStores";
import { useCallback } from "react";

// Randomized additional data for cards
const listings: Listing[] = Array.from({ length: 10 }, (_, index) => ({
  id: `UUID-${index}`,
  url: new URL(`https://placekitten.com/800/400?image=${index}`),
  address: `${index}24 Example St. Apt ${index}B`,
  rent: 2000 + index * 100,
  images: [`https://placekitten.com/800/400?image=${index}`, `https://placekitten.com/800/400?image=${index + 1}`],
  neighborhood: Neighborhood.GREENPOINT,
  bedroomCount: 1,
  bathroomCount: 1,
  hasBrokerFee: index % 2 === 0,
  sqFt: 400 + index * 10
}));

const firebaseHandle = new Firebase()

function Home(props: any) {
  const {
    userStore,
  } = useStores();

  const handleSignIn = useCallback(() => {
    firebaseHandle.signIn().then(user => {
      userStore.setCurrentUser(user)
    })
  }, [userStore])

  const currentUser = userStore.currentUser as User;

  return (
    <main>
      {currentUser && <h1>Logged in as: {currentUser?.email}</h1>}
      <button onClick={handleSignIn}>Sign in</button>
      <Listings listings={listings} />
    </main>
  );
}

export default observer(Home);

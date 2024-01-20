// v9 compat packages are API compatible with v8 code
import fb from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { getAuth, signInWithPopup, GoogleAuthProvider, User as FirebaseUser } from "firebase/auth";
import { Listing } from 'rb-shared';
import { firestoreCollections } from './firebase/collections';
import { User } from './core/user';

export class Firebase {
  private db: fb.firestore.Firestore;

  constructor() {
    // if (process.env.NODE_ENV === 'production') {
    //   throw new Error("Prod not configured yet!")
    // } else {
    fb.initializeApp({
      apiKey: 'AIzaSyBks9kOGQNrCRlqAFmn9oX0vK-TSurPEiY',
      authDomain: 'rental-buddy-dev.firebaseapp.com',
      projectId: 'rental-buddy-dev'
    });
    // }

    this.db = fb.firestore();
  }

  async getListings(): Promise<Listing[]> {
    const { streeteasy_listings } = firestoreCollections<fb.firestore.Firestore>(this.db)

    return await streeteasy_listings.get().then(snapshot => snapshot.docs.map(doc => doc.data()))
  }

  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential)
          throw new Error("No credential")

        // const token = credential.accessToken;
        const user = result.user;

        return toCoreUser(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error("Authentication failed. Error code: ", errorCode, ", errorMessage: ", errorMessage, ", email: ", email, ", credential: ", credential)
        throw new Error("Authentication failed! Check the console")
      });
  }
}

function toCoreUser(fbUser: FirebaseUser): User {
  return {
    uid: fbUser.uid,
    email: fbUser.email!,
    displayName: fbUser.displayName!,
    avatar: fbUser.photoURL!
  };
}

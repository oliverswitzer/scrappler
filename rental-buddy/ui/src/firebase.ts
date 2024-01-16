import fb from 'firebase/compat/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

if (process.env.NODE_ENV === 'production') {
  throw new Error("Prod not configured yet!")
} else {
  fb.initializeApp({
    apiKey: 'AIzaSyBks9kOGQNrCRlqAFmn9oX0vK-TSurPEiY',
    authDomain: 'rental-buddy-dev.firebaseapp.com',
    projectId: 'rental-buddy-dev'
  });
}

export class Firebase {
  async signIn(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential)
          throw new Error("No credential")

        const token = credential.accessToken;
        const user = result.user;
        // @ts-ignore
        window.token = token
        // @ts-ignore
        window.user = user

        return user
      })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   alert("Authentication failed! Check the console")
    //   console.error("Authentication failed. Error code: ", errorCode, ", errorMessage: ", errorMessage, ", email: ", email, ", credential: ")
    //   return null
    // });
  }
}

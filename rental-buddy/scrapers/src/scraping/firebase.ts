import admin from "firebase-admin";
import { Listing } from "rb-shared";

export class Firebase {
  private db: admin.firestore.Firestore;

  constructor() {
    const encryptedKey = process.env.ENCRYPTED_FIREBASE_SA_KEY

    if (!encryptedKey)
      throw new Error("Encrypted SA key not set")

    const serviceAccountKey = JSON.parse(Buffer.from(encryptedKey, 'base64').toString())

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey)
    });

    this.db = admin.firestore();
  }

  async storeListings(listings: Listing[]) {
    const batch = this.db.batch();
    const streetEasyListingsRef = this.db.collection("streeteasy_listings");

    listings.forEach(listing => {
      const docRef = streetEasyListingsRef.doc(listing.id);
      batch.set(docRef, toSerializable(listing), { merge: true });
    });

    await batch.commit();
  }
}

// Necessary to prepare data for serialization into Firestore
// (handles non-primitive types like URL() objects)
function toSerializable(obj: object) {
  return JSON.parse(JSON.stringify(obj))
}

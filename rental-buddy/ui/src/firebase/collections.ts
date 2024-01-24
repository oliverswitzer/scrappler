import { Listing, firestoreConverter } from 'rb-shared';
import { CollectionRef, EnvFirestore } from './types';

export const firestoreCollections = <F>(fb: EnvFirestore) => ({
  streeteasy_listings: fb.collection('streeteasy_listings').withConverter(firestoreConverter) as CollectionRef<F, Listing>,
});


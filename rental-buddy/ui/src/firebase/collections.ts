import { Listing, firestoreConverter } from 'rb-shared';
import { CollectionRef, EnvFirestore } from './types';

export const firestoreCollections = <F>(fb: EnvFirestore) => ({
  listings: fb.collection('listings').withConverter(firestoreConverter) as CollectionRef<F, Listing>,
});


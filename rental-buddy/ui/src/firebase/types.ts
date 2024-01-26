import { firestore as serverFirestore } from 'firebase-admin';
import type clientFirebase from 'firebase/compat/app';

/**
 * Types to support shared client/server Firebase utilities
 */
export type EnvFirestore = serverFirestore.Firestore | clientFirebase.firestore.Firestore;
export type Batch<F> = F extends serverFirestore.Firestore
  ? serverFirestore.WriteBatch
  : clientFirebase.firestore.WriteBatch;
export type CollectionRef<F, T> = F extends serverFirestore.Firestore
  ? serverFirestore.CollectionReference<T>
  : clientFirebase.firestore.CollectionReference<T>;
export type DocumentRef<F, T> = F extends serverFirestore.Firestore
  ? serverFirestore.DocumentReference<T>
  : clientFirebase.firestore.DocumentReference<T>;

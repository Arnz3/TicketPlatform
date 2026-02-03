// server/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let db: any = null;

export const useDb = () => {
  if (db) return db;

  const config = useRuntimeConfig();

  const app = initializeApp(config.public.FIREBASE_CONFIG);
  db = getFirestore(app);
  
  return db;
};
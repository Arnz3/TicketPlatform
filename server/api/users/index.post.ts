import { addDoc, collection } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDb();
  
  try {
    const docRef = await addDoc(collection(db, "users"), {
      fullName: body.fullName,
      email: body.email
    });
    console.log("User created");
    
    return docRef.id;
  } catch(e){
    console.error("Oops er is iets mis gegaan", e);
  }
})

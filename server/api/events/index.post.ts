// body shoud look like this
// {
//   name: ,
//   date: ,
//   location: ,
//   organizerId: ,
// }

import { addDoc, collection } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDb();

  try {
    const docRef = await addDoc(collection(db, "events"), {
      name: body.name,
      date: body.date,
      location: body.location,
      organizerId: body.organizerId,
    });
    console.log("Event created");
    
    return docRef.id;
  } catch(e){
    console.error("Oops er is iets mis gegaan", e);
  }

})

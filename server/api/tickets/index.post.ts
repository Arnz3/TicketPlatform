import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useDb } from "~~/server/utils/firebase";


// body shoud look like this
// {
//   eventId: ,
//   eventName: ,
//   userId: ,
//   holderName: ,
//   ticketTypeId: ,
// }

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDb();

  try {
    const docRef = await addDoc(collection(db, "tickets"), {
      eventId: body.eventId,
      eventName: body.eventName,
      purchaserId: body.userId,
      holderName: body.holderName,
      ticketTypeId: body.ticketTypeId,
      status: "active",
      createdAt: serverTimestamp()
    });
    console.log("Ticket created");
    
    return docRef.id;
  } catch(e){
    console.error("Oops er is iets mis gegaan", e);
  }
})

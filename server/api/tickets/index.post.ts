import { collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useDb } from "~~/server/utils/firebase";

// body shoud look like this
// {
//   eventId: ,
//   eventName: ,
//   purchaserId: ,
//   ticketTypeId: ,
//   tickets: [
//      {holderName: },
//      {holderName: }
//   ],
// }

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDb();

  const { eventId, eventName, purchaserId, ticketTypeId, tickets} = body;
  const numberOfTickets = tickets.length;
  try {
    await runTransaction(db, async (transaction) => {
      // get tickettype
      const ticketTypeRef = doc(db, "events", eventId, "ticketTypes", ticketTypeId);
      const ticketTypeSnap = await transaction.get(ticketTypeRef);

      if(!ticketTypeSnap.exists()){
        throw createError({
          statusCode: 404,
          statusMessage: "TicketType does not exist"
        });
      }

      const ticketTypeData = ticketTypeSnap.data();
      const newSoldCount = (ticketTypeData.soldCount || 0) + numberOfTickets;
      // check if max capacity is reached
      if(newSoldCount > ticketTypeData.capacity){
        throw createError({
          statusCode: 400,
          statusMessage: "Geen tickets meer over voor dit event"
        });
      }
      // update counter
      transaction.update(ticketTypeRef, { soldCount: newSoldCount });

      // create ticket for each name
      tickets.forEach((ticket: {holderName: String}) => {
        const newTicketRef = doc(collection(db, "tickets"));
        transaction.set(newTicketRef, {
          eventId,
          eventName,
          ticketTypeId,
          purchaserId,
          holderName: ticket.holderName,
          status: "active",
          createdAt: serverTimestamp()
        });
      });
    });

    return { succes: "true", message: `${numberOfTickets} tickets aangemaakt`}
  } catch(e: any){
    console.log(e);
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Internal Server Error"
    })
  }
})

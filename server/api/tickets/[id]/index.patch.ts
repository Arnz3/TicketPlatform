import { doc, runTransaction, serverTimestamp } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  const body = await readBody(event);
  const db = useDb();

  try {
    await runTransaction(db, async (transaction) => {
      const ticketRef = doc(db, "tickets", params.id);
      const ticketSnap = await transaction.get(ticketRef);

      if(!ticketSnap.exists()){
        throw createError({
          statusCode: 400,
          statusMessage: "Ticket not found!"
        });
      }

      const ticketData = ticketSnap.data();
      if (ticketData.status != "active"){
        createError({
          statusCode: 400,
          statusMessage: "Ticket is not valid!"
        })
      }

      transaction.update(ticketRef, {
        status: body.status || "used",
        scannedAt: serverTimestamp()
      });

      return {
        succes: "true",
        message: "ticket succesvol gescanned"
      }

    })
  } catch( e:any ){
    throw createError({
        statusCode: e.statusCode || 500,
        statusMessage: e.statusMessage || 'Internal Server Error'
    });
  }
})

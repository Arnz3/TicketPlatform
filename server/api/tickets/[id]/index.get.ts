import { doc, getDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  const db = useDb();

  try{
    const ticketsRef = doc(db, "tickets", params.id);

    const s = await getDoc(ticketsRef);
    if(!s.exists()){
      createError({
        statusCode: 400,
        statusMessage: "Ticket not found!"
      });
    }

    return {
      id: s.id,
      ...s.data()
    }
  } catch( e:any ){
    createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Internal Server Error"
    });
  }
})

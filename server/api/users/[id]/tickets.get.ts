import { collection, getDocs, query, where } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const db = useDb();

  try {
    const ticketsRef = collection(db, "tickets");

    const q = query(
      ticketsRef, 
      where("purchaserId", "==", id)
    );

    const snapshot = await getDocs(q);

    const tickets = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return tickets;
  } catch (e: any){
    createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Internal Server Error"
    })
  }
})

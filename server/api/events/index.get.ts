import { collection, getDocs, limit, query } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const db = useDb();

  try{
    const eventsRef = collection(db, "events");
    const q = query(
      eventsRef,
      limit(20)
    );

    const snapshot = await getDocs(q);

    const events = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    return events;

  } catch(e: any) {
    createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Internal Server Error"
    })
  }
})

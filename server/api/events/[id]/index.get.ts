import { doc, getDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  const db = useDb();

  try {
    const docRef = doc(db, "events", params.id);

    const snapshot = await getDoc(docRef);
    if(!snapshot.exists()){
      throw createError({
        statusCode: 404,
        statusMessage: "Event not found!"
      });
    }

    return {
      id: snapshot.id,
      ...snapshot.data()
    };

  }catch(e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Internal Server Error"
    });
  }
}
)

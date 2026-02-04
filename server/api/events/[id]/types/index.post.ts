import { addDoc, collection } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = getRouterParam(event, "id");
  const db = useDb();

  try{
    const path = `events/${id}/ticketTypes`;
    const subCollectionRef = collection(db, path)

    // add doc
    const newType = await addDoc(subCollectionRef, {
      name: body.name,
      price: body.price,
      capacity: body.capacity,
      soldCount: 0
    });

    return newType.id

  }catch(e: any){
    console.error("Oops something went wrong", e);
  }
})

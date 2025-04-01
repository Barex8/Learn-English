import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./assets/firebase"; 

const db = getFirestore(app);

export const ObtenerDatos = async () => {
  const querySnapshot = await getDocs(collection(db, "Vocabulary")); //Accedemos a la colección
  querySnapshot.forEach((doc) => { // recorremos cada documento
    console.log(doc.id, " => ", doc.data()," Inglés: ",doc.data().En); //Podemos obtener campos con doc.data().campo.
    
  });
};

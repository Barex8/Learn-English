import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./assets/firebase"; 

const db = getFirestore(app);

export const ObtenerDatos = async () => {
  const querySnapshot = await getDocs(collection(db, "vocabulary")); //Accedemos a la colección
  querySnapshot.forEach((doc) => { // recorremos cada documento
    console.log(doc.id, " => ", doc.data()," Inglés: ",doc.data().En); //Podemos obtener campos con doc.data().campo.
    
  });
};

export const RandomVocabulary = async () => {
    const querySnapshot = await getDocs(collection(db, "vocabulary"));
    const randomNumber = Math.floor(Math.random() * (querySnapshot.size )) + 1;
    console.error(querySnapshot.size);
    let i = 1;
    for (const doc of querySnapshot.docs) {
        if (i === randomNumber) {
          console.log(doc.id, " => ", doc.data(), " Inglés: ", doc.data().En);
            return doc.data();
        }
        i++; // Incrementamos el contador
      }
}

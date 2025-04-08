import { getFirestore, collection, getDocs,query,where,addDoc } from "firebase/firestore";
import { app } from "./assets/firebase"; 
import { useState } from "react";

const db = getFirestore(app);

export const loged = false;

export const ObtenerDatos = async () => {
  const querySnapshot = await getDocs(collection(db, "vocabulary")); //Accedemos a la colección
  querySnapshot.forEach((doc) => { // recorremos cada documento
    console.log(doc.id, " => ", doc.data()," Inglés: ",doc.data().En); //Podemos obtener campos con doc.data().campo.
    
  });
};

export const RandomVocabulary = async () => {
  let idUser = localStorage.getItem("userId");
  if(!idUser) return "NoUserId";

  // Consulta para obtener los vocabularios del usuario
  const userRef = collection(db, "users_vocabulary");
  const q = query(userRef, where("id_user", "==", idUser));
  
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Seleccionamos un número aleatorio dentro de los resultados
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);

    // Accedemos al documento aleatorio
    const randomDoc = querySnapshot.docs[randomIndex];
    console.log(randomDoc.data().id_vocabulary);

    // Consultamos el id_vocabulary asociado con ese documento
    const wordRef = collection(db, "vocabulary");
    const querySnapshotWord = await getDocs(wordRef);

    // const wordQuery = query(wordRef, where("id", "==", randomDoc.data().id_vocabulary));
    // const querySnapshotWord = await getDocs(wordQuery);
    let word;
    querySnapshotWord.forEach((wordRef) => { // recorremos cada documento
      if(wordRef.id === randomDoc.data().id_vocabulary){
        console.log(wordRef.id, " => ", wordRef.data()," Inglés: ",wordRef.data().En); //Podemos obtener campos con doc.data().campo.
        word = wordRef.data();
      }
      
    });


    if (!querySnapshotWord.empty) {
      console.log(word.id, " => ", word, " Inglés: ", word.En);
      return word;
    } else {
      console.log("No se encontró la palabra.");
    }
  } else {
    console.log("No se encontraron vocabularios para este usuario.");
    return ("NoWords");
  }
};


export const AddVocabulary = async (enWord,esWord) => {
  console.log("Palabra en inglés: ",enWord);
    try {
      const docRef = await addDoc(collection(db, "vocabulary"), {
       En: enWord,
       Es: esWord
      });

      const usersVocabularyRef = await addDoc(collection(db, "users_vocabulary"), {
        id_user: localStorage.getItem("userId"),
        id_vocabulary: docRef.id
       });
      console.log("Documento agregado con ID: ", docRef.id);
    } catch (e) {
      console.error("Error al agregar documento: ", e);
    }
  }

  export const getUserVocabularyWords = async () => {
    const idUser = localStorage.getItem("userId");
    if (!idUser) return [];
  
    // 1. Obtener relaciones del usuario
    const userRef = collection(db, "users_vocabulary");
    const q = query(userRef, where("id_user", "==", idUser));
    const querySnapshot = await getDocs(q);
    //Aquí ya tiene solamente los registros de la tabla intermedia que coinciden con el usuario
  
    if (querySnapshot.empty) return [];
  
    // 2. Obtener las IDs de las palabras
    const vocabularyIds = querySnapshot.docs.map(doc => doc.data().id_vocabulary); //Extrae todos los valores de id_vocabulary que están relacionados con ese usuario
  
    // 3. Hacer múltiples lecturas a Firestore para cada palabra
    const wordPromises = vocabularyIds.map(async (id) => { // por cada palabra la añadimos a wordPromises
      const wordDoc = await getDocs(
        query(collection(db, "vocabulary"), where("__name__", "==", id)) // Esta línea busca en la colección vocabulary un documento cuyo ID (clave primaria) sea igual al que recuperamos. 
        // En Firestore, el ID no es un campo normal, se accede usando "__name__".
      );
      return wordDoc.docs[0]?.data(); // asumimos que hay un documento por ID, añade la palabra a wordPromises
    });
  
    const words = await Promise.all(wordPromises); //Espera a que termine wordPromises y guarda todas las palabras
    return words.filter(Boolean); // quitamos posibles undefined
  };

  export async function verifyUser(user, password) {
    console.log(user, " username");
    if (user === "") return "Insert an username";
  
    const userRef = collection(db, "users");
    const q = query(userRef, where("username", "==", user));
  
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      for (const doc of querySnapshot.docs) {
        if (doc.data().password === password) {
          console.log("Usuario encontrado:", doc.data());

          localStorage.setItem("userId", doc.id);
          localStorage.setItem("username", doc.data().username);
          window.dispatchEvent(new Event("usernameChanged"));

          console.log(localStorage.getItem("userId"),doc.id);
          alert("Succesful login")

          return "";
        } else {
          console.log("Contraseña incorrecta", doc.data());
          return "Insert the correct password/username.";
        }
      }
    } else {
      console.log("Usuario no encontrado");
      return "Insert the correct password/username.";
    }
  }

  async function checkUserExistence (user){  
    const userRef = collection(db, "users");
    const q = query(userRef, where("username", "==", user));
  
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.empty);
    if (!querySnapshot.empty) { //Si hay un usuario con ese username devuelve false
          return false;
      }
      console.log("Usuario no encontrado");
      return true;
}
  
  export const createUser = async (username, password) => {
    const verificationResult = await checkUserExistence(username, password);
  
    if (verificationResult) {
      if (username !== "" && password !== "") {
        await addDoc(collection(db, "users"), {
          username: username,
          password: password,
        });
        console.log("Usuario creado");
        return;
      }
    }
    console.log("Usuario no creado");
    return "You can't use this username";
  };
  
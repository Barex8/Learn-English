import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../assets/firebase';


// Datos que vamos a insertar
const documentsToAdd = [
  { En: 'hump', Es: 'joroba' },
  { En: 'roadblock', Es: 'barricada' },
  { En: 'sled', Es: 'trineo' },
  { En: 'on the lam', Es: 'a la fuga' },
  { En: 'swoon', Es: 'desmayarse' },
  { En: 'vow', Es: 'promesa' },
  { En: 'lurid', Es: 'escandaloso' },
  { En: 'bundle up', Es: 'abrigarse' },
  { En: 'rake', Es: 'rastrillo' },
  { En: 'haste', Es: 'prisa' },
  { En: 'sorrowful', Es: 'afligido' },
  { En: 'foisted', Es: 'impuesto' },
  { En: 'cheek', Es: 'mejilla' },
  { En: 'sow', Es: 'sembrar' },
  { En: 'mayhap', Es: 'quizás' },
  { En: 'rife', Es: 'abundante' },
  { En: 'eons', Es: 'eones' },
  { En: 'praise', Es: 'elogiar' },
  { En: 'preach', Es: 'predicar' },
  { En: 'dissenters', Es: 'disidentes' },
  { En: 'hallowed', Es: 'sagrado' },
  { En: 'lies ahead', Es: 'porvenir' },
  { En: 'what lies ahead?', Es: 'qué nos espera' },
  { En: 'vessel', Es: 'embarcación' },
  { En: 'bishops', Es: 'obispos' },
  { En: 'foolish', Es: 'tonto' },
  { En: 'nevertheless', Es: 'sin embargo' },
  { En: 'wave', Es: 'ola' },
  { En: 'napkin', Es: 'servilleta' },
  { En: 'stare', Es: 'mirar' },
  { En: 'sock', Es: 'calcetín' },
  { En: 'all of a sudden', Es: 'de repente' },
  { En: 'obnoxious', Es: 'odioso' },
  { En: 'get off', Es: 'bajarse' },
  { En: 'laid', Es: 'colocado' },
  { En: 'sleeve', Es: 'manga' },
  { En: 'fiends', Es: 'demonios' },
  { En: 'ditch', Es: 'zanja' },
  { En: 'elder', Es: 'anciano' },
  { En: 'witted', Es: 'ingenioso' },
  { En: 'lousy', Es: 'horrible' },
  { En: 'luggage', Es: 'equipaje' },
  { En: 'selfish', Es: 'egoísta' },
  { En: 'tad', Es: 'poco' },
  { En: 'low-key', Es: 'discreto' },
  { En: 'mingle', Es: 'mezclarse' },
  { En: 'wise', Es: 'sabio' },
  { En: 'sacred', Es: 'sagrado' },
  { En: 'rouse', Es: 'despertar' },
  { En: 'heaps', Es: 'montones' },
  { En: 'off-key', Es: 'desafinado' },
  { En: 'tight-knit', Es: 'unido' },
  { En: 'burbs', Es: 'suburbios' },
  { En: 'drapes', Es: 'cortinas' }
];

// Función para agregar una pila de documentos
export const addDocumentsInBatch = async () => {
  // Inicializamos el batch
  const batch = writeBatch(db);

  // Recorremos los documentos y los agregamos al batch
  documentsToAdd.forEach(docData => {
    console.log(db);
    console.log(docData);
    const docRef = doc(collection(db, "vocabulary")); // Asegúrate de cambiar el nombre de la colección
    batch.set(docRef, docData); // Añade el documento al batch
  });

  try {
    // Commit del batch, para realizar todas las escrituras de una sola vez
    await batch.commit();
    console.log("Documentos agregados correctamente.");
  } catch (error) {
    console.error("Error al agregar los documentos: ", error);
  }
};

// Llamamos a la función para agregar los documentos
// addDocumentsInBatch();

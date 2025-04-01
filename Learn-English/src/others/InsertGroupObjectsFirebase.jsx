import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../assets/firebase';


// Datos que vamos a insertar
const documentsToAdd = [
  { id: '1', En: 'abandon', Es: 'abandonar' },
  { id: '2', En: 'ability', Es: 'habilidad' },
  { id: '3', En: 'absence', Es: 'ausencia' },
  { id: '4', En: 'accept', Es: 'aceptar' },
  { id: '5', En: 'accident', Es: 'accidente' },
  { id: '6', En: 'advice', Es: 'consejo' },
  { id: '7', En: 'affect', Es: 'afectar' },
  { id: '8', En: 'against', Es: 'en contra de' },
  { id: '9', En: 'alcohol', Es: 'alcohol' },
  { id: '10', En: 'ancient', Es: 'antiguo' },
  { id: '11', En: 'animal', Es: 'animal' },
  { id: '12', En: 'appearance', Es: 'apariencia' },
  { id: '13', En: 'appetite', Es: 'apetito' },
  { id: '14', En: 'argument', Es: 'argumento' },
  { id: '15', En: 'arrange', Es: 'organizar' },
  { id: '16', En: 'article', Es: 'artículo' },
  { id: '17', En: 'attractive', Es: 'atractivo' },
  { id: '18', En: 'average', Es: 'promedio' },
  { id: '19', En: 'balance', Es: 'balance' },
  { id: '20', En: 'battery', Es: 'batería' },
  { id: '21', En: 'benefit', Es: 'beneficio' },
  { id: '22', En: 'brilliant', Es: 'brillante' },
  { id: '23', En: 'calendar', Es: 'calendario' },
  { id: '24', En: 'celebrate', Es: 'celebrar' },
  { id: '25', En: 'challenge', Es: 'desafío' },
  { id: '26', En: 'character', Es: 'carácter' },
  { id: '27', En: 'chocolate', Es: 'chocolate' },
  { id: '28', En: 'climate', Es: 'clima' },
  { id: '29', En: 'complicated', Es: 'complicado' },
  { id: '30', En: 'computer', Es: 'computadora' },
  { id: '31', En: 'conscious', Es: 'consciente' },
  { id: '32', En: 'construct', Es: 'construir' },
  { id: '33', En: 'contrast', Es: 'contrastar' },
  { id: '34', En: 'courage', Es: 'coraje' },
  { id: '35', En: 'create', Es: 'crear' },
  { id: '36', En: 'dangerous', Es: 'peligroso' },
  { id: '37', En: 'decision', Es: 'decisión' },
  { id: '38', En: 'deserve', Es: 'merecer' },
  { id: '39', En: 'difficult', Es: 'difícil' },
  { id: '40', En: 'economy', Es: 'economía' },
  { id: '41', En: 'efficient', Es: 'eficiente' },
  { id: '42', En: 'enough', Es: 'suficiente' },
  { id: '43', En: 'environment', Es: 'medio ambiente' },
  { id: '44', En: 'essential', Es: 'esencial' },
  { id: '45', En: 'evaluate', Es: 'evaluar' },
  { id: '46', En: 'examine', Es: 'examinar' },
  { id: '47', En: 'experience', Es: 'experiencia' },
  { id: '48', En: 'expert', Es: 'experto' },
  { id: '49', En: 'exercise', Es: 'ejercicio' },
  { id: '50', En: 'explore', Es: 'explorar' },
  { id: '51', En: 'factor', Es: 'factor' },
  { id: '52', En: 'fantastic', Es: 'fantástico' },
  { id: '53', En: 'feature', Es: 'característica' },
  { id: '54', En: 'follow', Es: 'seguir' },
  { id: '55', En: 'forget', Es: 'olvidar' },
  { id: '56', En: 'further', Es: 'más lejos' },
  { id: '57', En: 'future', Es: 'futuro' },
  { id: '58', En: 'gallery', Es: 'galería' },
  { id: '59', En: 'general', Es: 'general' },
  { id: '60', En: 'generate', Es: 'generar' },
  { id: '61', En: 'habit', Es: 'hábito' },
  { id: '62', En: 'healthy', Es: 'saludable' },
  { id: '63', En: 'history', Es: 'historia' },
  { id: '64', En: 'imagine', Es: 'imaginar' },
  { id: '65', En: 'importance', Es: 'importancia' },
  { id: '66', En: 'influence', Es: 'influencia' },
  { id: '67', En: 'interesting', Es: 'interesante' },
  { id: '68', En: 'invention', Es: 'invención' },
  { id: '69', En: 'journey', Es: 'viaje' },
  { id: '70', En: 'journey', Es: 'viaje' },
  { id: '71', En: 'language', Es: 'idioma' },
  { id: '72', En: 'leader', Es: 'líder' },
  { id: '73', En: 'local', Es: 'local' },
  { id: '74', En: 'manage', Es: 'gestionar' },
  { id: '75', En: 'measure', Es: 'medir' },
  { id: '76', En: 'method', Es: 'método' },
  { id: '77', En: 'mood', Es: 'estado de ánimo' },
  { id: '78', En: 'mountain', Es: 'montaña' },
  { id: '79', En: 'nature', Es: 'naturaleza' },
  { id: '80', En: 'opinion', Es: 'opinión' },
  { id: '81', En: 'opportunity', Es: 'oportunidad' },
  { id: '82', En: 'organize', Es: 'organizar' },
  { id: '83', En: 'original', Es: 'original' },
  { id: '84', En: 'overcome', Es: 'superar' },
  { id: '85', En: 'participate', Es: 'participar' },
  { id: '86', En: 'peace', Es: 'paz' },
  { id: '87', En: 'personality', Es: 'personalidad' },
  { id: '88', En: 'politics', Es: 'política' },
  { id: '89', En: 'problem', Es: 'problema' },
  { id: '90', En: 'productive', Es: 'productivo' },
  { id: '91', En: 'question', Es: 'pregunta' },
  { id: '92', En: 'reliable', Es: 'fiable' },
  { id: '93', En: 'result', Es: 'resultado' },
  { id: '94', En: 'science', Es: 'ciencia' },
  { id: '95', En: 'situation', Es: 'situación' },
  { id: '96', En: 'society', Es: 'sociedad' },
  { id: '97', En: 'solution', Es: 'solución' },
  { id: '98', En: 'success', Es: 'éxito' },
  { id: '99', En: 'support', Es: 'apoyo' },
  { id: '100', En: 'technology', Es: 'tecnología' }
];

// Función para agregar una pila de documentos
export const addDocumentsInBatch = async () => {
  // Inicializamos el batch
  const batch = writeBatch(db);

  // Recorremos los documentos y los agregamos al batch
  documentsToAdd.forEach(docData => {
    const docRef = doc(collection(db, "vocabulary"), docData.id); // Asegúrate de cambiar el nombre de la colección
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

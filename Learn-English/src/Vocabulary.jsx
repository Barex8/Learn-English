import { useState, useEffect } from "react";
import { RandomVocabulary } from "./FireStoreManager";
import { addDocumentsInBatch } from "./others/InsertGroupObjectsFirebase";

export default function Vocabulary() {
  const [doc, setDoc] = useState({});
  const [translation, setTranslation] = useState("");

  const [translationCorrect, setTranslationCorrect] = useState(false);
  const [translationIncorrect, setTranslationIncorrect] = useState(false);

  const [translatedWords, setTranslatedWords] = useState([]); // ⬅️ Debe ser un array vacío

  const [enToEs,setEnToEs] = useState(true);

  const handleRandomWord = async () => {
    // addDocumentsInBatch(); //Para añadir una pila de archivos desde InsertGroupObjectsFirebase
    const word = await RandomVocabulary(); // Asumimos que RandomVocabulary devuelve la palabra aleatoria
    setDoc(word); // Actualizamos el estado con la palabra aleatoria
  };

  const handleChangeTranslation = (event) => {
    setTranslation(event.target.value); // Actualiza el estado con el valor del input
  };

  const checkTranslation = () => {
    let lenguage;
    if(enToEs)lenguage = doc.Es
    else lenguage = doc.En;
    console.log(lenguage); 
    
    if (compareStrings(translation, lenguage)) {
      setTranslationCorrect(true);
      setTimeout(() => setTranslationCorrect(false), 1950);
      
      // Agregar palabra traducida correctamente a la lista
      setTranslatedWords([...translatedWords, doc]); 
      setDoc({});
      setTranslation("");
      
    } else {
      setTranslationIncorrect(true);
      setTimeout(() => setTranslationIncorrect(false), 1950);
    }
  };

  const ShowTranslation = () => {
    let lenguage;
    if(enToEs)lenguage = doc.Es
    else lenguage = doc.En;

    setTranslation(lenguage);
  }

  const ChangeLenguage = () => {
    setEnToEs(!enToEs);
  }

  return (
    <>
      <div>
        <h2> Vocabulary </h2>
        <button onClick={handleRandomWord}> Generate a Vocabulary Random Word </button>

        <div>
          <div className="inputs">
            <div className="container">
            {enToEs ? (
              <>
                English
                <input type="text" value={doc.En || ''} readOnly />
              </>
          ):(<>
            Español
            <input type="text" value={doc.Es || ''} readOnly />
          </>
          )}

          </div>
            &emsp;&emsp; <button onClick ={ChangeLenguage}> Change </button>&emsp;&emsp;
            <div className="container">
            {enToEs ? (<>English</>) : (<>English</>)}
            <input type="text" value={translation} onChange={handleChangeTranslation} />

            </div>
          </div>

          <br />
          <div className="container">
            <div className="ControlBtns">
              <button onClick={checkTranslation}> Check </button>
              <button onClick={ShowTranslation}> Desist </button>
            </div>

            {translationCorrect && <div className="floating-Correct-text">Correcto</div>}
            {translationIncorrect && <div className="floating-Incorrect-text">Incorrecto</div>}
          </div>
        </div>

        {/* ✅ Llamar al componente correctamente pasando la lista de palabras */}
        <TranslatedWordsTable translatedWords={translatedWords} />
      </div>
    </>
  );
}

// ✅ Convertimos la función en un componente
function TranslatedWordsTable({ translatedWords }) {
    let reverseTranslatedWords = [...translatedWords].reverse();
  return (
    <div className="container">
      <h3>Vocabulary Table</h3>
      <table>
        <thead>
          <tr>
            <th>English</th>
            <th>Español</th>
          </tr>
        </thead>
        <tbody>
          {reverseTranslatedWords.map((word, index) => (
            <tr key={index}>
              <td>{word.En}</td>
              <td>{word.Es}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function compareStrings(str1, str2) { // devuelve true o false comparando los string sin tener en cuenta mayúsuculas ni acentos 
  return str1
    .toLocaleLowerCase() // Convierte todo a minúsculas
    .normalize("NFD")    // Separa los acentos de las letras
    .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
    === 
    str2
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
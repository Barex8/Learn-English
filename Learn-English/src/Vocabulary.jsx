import { useState, useEffect } from "react";
import { RandomVocabulary } from "./FireStoreManager";

export default function Vocabulary() {
  const [doc, setDoc] = useState({});
  const [translation, setTranslation] = useState("");

  const [translationCorrect, setTranslationCorrect] = useState(false);
  const [translationIncorrect, setTranslationIncorrect] = useState(false);

  const [translatedWords, setTranslatedWords] = useState([]); // ⬅️ Debe ser un array vacío

  const handleRandomWord = async () => {
    const word = await RandomVocabulary(); // Asumimos que RandomVocabulary devuelve la palabra aleatoria
    setDoc(word); // Actualizamos el estado con la palabra aleatoria
  };

  const handleChangeTranslation = (event) => {
    setTranslation(event.target.value); // Actualiza el estado con el valor del input
  };

  const checkTranslation = () => {
    if (translation === doc.Es) {
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
    setTranslation(doc.Es);
  }

  return (
    <>
      <div>
        <h2> Vocabulary </h2>
        <button onClick={handleRandomWord}> Generate a Vocabulary Random Word </button>

        <div>
          <div className="inputs">
            <input type="text" value={doc.En || ''} readOnly />
            &emsp;&emsp;&emsp;&emsp;
            <input type="text" value={translation} onChange={handleChangeTranslation} />
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
      <h2>Vocabulary Table</h2>
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

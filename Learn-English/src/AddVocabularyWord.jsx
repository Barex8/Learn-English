import { useState, useEffect } from "react";
import { AddVocabulary } from "./FireStoreManager";

export default function AddVocabularyWord(){

    const [selectedOption, setSelectedOption] = useState("English");
    const [wordsSaved, setWordsSaved] = useState([]);

    const [esWord, setEsWord] = useState("");  // Estado para la palabra en español
    const [enWord, setEnWord] = useState("");  // Estado para la palabra en inglés

    const handleEnWordChange = (e) => {
        setEnWord(e.target.value); // Actualiza el estado con el valor del input
    };
  
    const handleEsWordChange = (e) => {
        setEsWord(e.target.value); // Actualiza el estado con el valor del input
    };

    const handleAddVocabulary = () => {
        console.log("En Word:", enWord, "Es Word:", esWord); // Verifica que los valores son correctos
        if (enWord && esWord) { // Solo llama a AddVocabulary si ambos valores no son vacíos
            AddVocabulary(enWord, esWord); // Llama a la función AddVocabulary pasando los valores
        } else {
            console.log("Ambos campos deben ser completados.");
        }
    };

    return (
        <>
            <h2>Add Vocabulary Word</h2>
            <div>
                <div className="inputs">
                    <div className="container">
                        English
                        <input type="text" onChange={handleEnWordChange} value={enWord} />
                    </div>
                    &emsp;&emsp;&emsp;&emsp;
                    <div className="container">
                        Español
                        <input type="text" onChange={handleEsWordChange} value={esWord} />
                    </div>
                </div>
                <br />
                <button onClick={handleAddVocabulary}> Add </button> {/* Llama a la función para agregar */}
            </div>
            <h3> Your vocabulary words</h3>
            {/* <WordsSavedTable /> */}
        </>
    );
}

function WordsSavedTable({ wordsSaved }) {
    let reverseSavedWords = [...wordsSaved].reverse();
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
                    {reverseSavedWords.map((word, index) => (
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

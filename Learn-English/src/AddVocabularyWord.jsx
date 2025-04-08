import { useState, useEffect } from "react";
import { AddVocabulary } from "./FireStoreManager";
import FloatingMessage from "./others/FlotatingMessage";
import { getUserVocabularyWords } from "./FireStoreManager";

export default function AddVocabularyWord(){

    const [wordsSaved, setWordsSaved] = useState([]);
    
    useEffect(() => {
        const fetchWords = async () => {
          const words = await getUserVocabularyWords(); // Llamamos a la función que obtiene las palabras
          setWordsSaved(words); // Establecemos el estado con el array de palabras
        };
    
        fetchWords(); // Ejecutamos la función asíncrona
      }, []); // Solo se ejecuta una vez cuando el componente se monta
    

    const [esWord, setEsWord] = useState("");  // Estado para la palabra en español
    const [enWord, setEnWord] = useState("");  // Estado para la palabra en inglés

    const handleEnWordChange = (e) => {
        setEnWord(e.target.value); // Actualiza el estado con el valor del input
    };
  
    const handleEsWordChange = (e) => {
        setEsWord(e.target.value); // Actualiza el estado con el valor del input
    };

    const handleAddVocabulary = async () => {   
        if(!localStorage.getItem("username")){ //Verificamos que hemos iniciado sesión
            showMessage("First log in")
            return;
        }

        if ((enWord != "" || esWord != "")) { // Solo llama a AddVocabulary si ambos valores no son vacíos
            await AddVocabulary(enWord, esWord); // Llama a la función AddVocabulary pasando los valores
            showMessage("Word added","rgb(26, 231, 77)");
            const words = await getUserVocabularyWords(); // Vuelve a obtener todas las palabras
            setWordsSaved(words);
        } else {
            showMessage("The inputs can't be empty")
        }
    };
    
    const showMessage = (message, color = "red") => {
        window.dispatchEvent(new CustomEvent("show-message", {
          detail: { message, color }
        }));
    }

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
                <FloatingMessage />
                </div>
                <br />
                <button onClick={handleAddVocabulary}> Add </button> {/* Llama a la función para agregar */}
            </div>
            <h3> Your vocabulary words</h3>
            <WordsSavedTable wordsSaved={wordsSaved}/>
        </>
    );
}

function WordsSavedTable({ wordsSaved }) {
    let reverseSavedWords = [...wordsSaved];
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

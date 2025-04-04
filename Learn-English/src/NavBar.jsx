import './App.css'
import { Link } from 'react-router-dom'; // Routes y Link de react-router-dom


export default function NavBar(){
    return (<>
     <div className="navbar">
      <Link to="./Login">Login</Link> {/* Usamos Link en lugar de <a> */}
      <div className="dropdown">
        <button className="dropbtn">
          Vocabulary
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link to="./Vocabulary">Learn</Link>
          <Link to="./AddVocabularyWord">Insert new words</Link>
          <Link to="#">Link 3</Link>
        </div>
      </div>      
    </div>
    </>);
}
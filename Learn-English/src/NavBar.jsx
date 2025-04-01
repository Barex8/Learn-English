import './App.css'
import { Link } from 'react-router-dom'; // Routes y Link de react-router-dom


export default function NavBar(){
    return (<>
     <div className="navbar">
      <Link to="/">Home</Link> {/* Usamos Link en lugar de <a> */}
      <div className="dropdown">
        <button className="dropbtn">
          Vocabulary
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link to="./Vocabulary">Learn</Link>
          <Link to="#">Insert new words</Link>
          <Link to="#">Link 3</Link>
        </div>
      </div>      
      <div className="dropdown">
        <button className="dropbtn">
          More
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link to="#">Link 1</Link>
          <Link to="#">Link 2</Link>
          <Link to="#">Link 3</Link>
        </div>
      </div>
    </div>
    </>);
}
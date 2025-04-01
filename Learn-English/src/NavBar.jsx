import './App.css'
import { Link } from 'react-router-dom'; // Routes y Link de react-router-dom


export default function NavBar(){
    return (<>
     <div className="navbar">
      <Link to="/">Home</Link> {/* Usamos Link en lugar de <a> */}
      <Link to="/news">News</Link> {/* Ruta para News */}
      
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
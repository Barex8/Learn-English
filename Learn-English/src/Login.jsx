import React from "react";
import { ObtenerDatos } from './FireStoreManager'
import { useState } from "react";
import { verifyUser,createUser } from "./FireStoreManager";

export default function Home(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const [credentialState,setCredentialState] = useState("");

    const handleChangeUsername = (event) => {
        setUsername(event.target.value); // Actualiza el estado con el valor del input
      };

    const handleChangePassword = (event) => {
        setPassword(event.target.value); //Actualiza el estado con el valor del input
      };

    const logIn = (event) =>{
        event.preventDefault;
        let message = verifyUser(username, password);
        console.log(message);
        setCredentialState(message);
      };

    const createProfile = (event) =>{
        event.preventDefault;

        let message = createUser(username,password)
        console.log(message);
        setCredentialState(message);
    }

    return( <>
    <h2>Login</h2>
    <div className="login-page">
        <div className="form">

            <div className="container">
            <input type="text" placeholder="username" onChange={handleChangeUsername}/>
            </div>

            <div className="container">
            <input type="password" placeholder="password" onChange={handleChangePassword}/>
            </div>

            <br />
            <button onClick={logIn}>Log in</button>
            {credentialState !== "" && (<>
                <div>
                <span style={{color:"red"}}> {credentialState} </span>
                </div>
            </>)}
        </div>
        <br />
        <div className="container">
        If you don't have a profile:
        <button onClick={createProfile}>Create profile</button>

        </div>
    </div>
    </>)
}
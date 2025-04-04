import './App.css'
import { useState, useEffect } from 'react';

export default function Header() {
    const [username, setUsername] = useState(localStorage.getItem("username") || "please log in");

    useEffect(() => {
        const handleStorageChange = () => {
            setUsername(localStorage.getItem("username") || "");
        };

        window.addEventListener("usernameChanged", handleStorageChange);

        return () => {
            window.removeEventListener("usernameChanged", handleStorageChange);
        };
    }, []);

    return (
        <>
            <div className='titleContainer'>
                <h1 className='title'>Learn English</h1>
                Welcome {username}
            </div>
        </>
    );
}

import { useEffect, useState } from "react";

export default function FloatingMessage(){
    const [ message, setMessage] = useState(null);
    const [ color,setColor] = useState("red");

    useEffect(() =>{
        const handleShowMessage = (event) => {
            setMessage(event.detail.message);
            setColor(event.detail.color || "red");

            setTimeout(() =>{
                setMessage(null);
            }, 1950);
        };

        window.addEventListener("show-message",handleShowMessage);
        return () => {
            window.removeEventListener("show-message", handleShowMessage);
        };
    },[]);

    if(!message) return null;

    return(<div className="floating-text" style = {{color:color}}>{message}</div>);

    }
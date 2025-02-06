import { useEffect, useState } from "react";
import './style.css';

export default function Header() {
    const [memberFirstName, setMemberFirstName] = useState(localStorage.getItem("memberFirstName") || "");

    useEffect(() => {
        const updateMember = () => {
            setMemberFirstName(localStorage.getItem("memberFirstName") || "");
        };

        window.addEventListener("storage", updateMember);
        return () => {
            window.removeEventListener("storage", updateMember);
        };
    }, []);

    return (
        <div className='header'>
            <div className="logo-container">
                <img className="logo-header" alt='logo' src="/favicon.svg" />
                <h1>O'Tennis</h1>
            </div>
            <div className="member-name">
                {memberFirstName ? <p>Bienvenue {memberFirstName}</p> : <p>Bienvenue !</p>}
            </div>
        </div>
    );
}

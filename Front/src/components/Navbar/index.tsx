import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './style.css';

export default function Navbar() {
    const [, setMemberFirstName] = useState(localStorage.getItem("memberFirstName") || "");
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        const updateState = () => {
            setIsAuthenticated(!!localStorage.getItem("token"));
            setMemberFirstName(localStorage.getItem("memberFirstName") || "");
        };

        window.addEventListener("storage", updateState);

        return () => {
            window.removeEventListener("storage", updateState);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("memberFirstName");
        setIsAuthenticated(false);
        setMemberFirstName("");
        window.dispatchEvent(new Event("storage"));
        navigate("/");
    };

    return (
        <div className='navbar-container'>
            <div>
                <Link className='nav-link left' to={'/'}>Accueil</Link>
                <Link className='nav-link left' to={'/about'}>À propos</Link>
            </div>

            <div>
                {isAuthenticated ? (
                    <>
                        <Link className='nav-link right' to={'/terrain'}>Terrains</Link>
                        <Link className='nav-link right' to={'/dashboard'}>Mon compte</Link>
                        {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                        <a href='#' className='nav-link right' onClick={handleLogout}>Se déconnecter</a>
                        
                    </>
                ) : (
                    <Link className='nav-link right' to={'/login'}>Se connecter</Link>
                )}
            </div>
        </div>
    );
}

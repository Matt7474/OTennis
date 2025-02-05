import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react';

export default function Navbar() {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));

        window.addEventListener("storage", checkAuth);
        window.addEventListener("login", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("login", checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };


    return (
        <>
            <div className='navbar-container'>
                <div>
                    <Link className='nav-link left' to={'/'}>Accueil</Link>
                    <Link className='nav-link left' to={'/about'}>A propos</Link>
                </div>
    
                <div>
                    
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
        </>
    );
}
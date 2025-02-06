import { useState } from 'react'
import './Login.css'
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        try{
            const baseUrl:string = import.meta.env.VITE_BACKEND_BASE_URL;
            const response = await fetch(`${baseUrl}/login`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
            
            const data = await response.json()
            console.log("connexion reussi ! !", data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("memberId", data.id);
            window.dispatchEvent(new Event("login"));
            navigate("/dashboard");
        
        }catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erreur de connexion :", error);
                setError(error.message);
            } else {
                console.error("Erreur inconnue :", error);
                setError("Une erreur inconnue est survenue");
            }
        }
    }


    return(
        <>
            <div className='login-container'>

                <h1>Connexion</h1>
                <form action='submit' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <div className='input-container'>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' id='email' />
                        <i className={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? "valid" : "invalid"}>
                        {/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? <Check color="green" /> : <X color="red" />}
                        </i>
                    </div>
                        
                    <label htmlFor='password'>Mot de passe</label>
                    <div className='input-container'>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' id='password' />
                        <i className={password.length >= 6 ? "valid" : "invalid"}>
                        {password.length >= 6 ? <Check color="green" /> : <X color="red" />}
                        </i> 
                    </div>

                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button>Se connecter</button>
                </form>
            </div>
        </>
    )
}
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Age } from '../utils/Age';
import dayjs from 'dayjs';
import './details.css'

export default function Details() {
    const { id } = useParams();
    const [error, setError] = useState<string | null>(null);
    const [member, setMember] = useState<any>(null);

    const getMemberById = async (id: string) => {
        try {
            const baseUrl: string = import.meta.env.VITE_BACKEND_BASE_URL;
            const response = await fetch(`${baseUrl}/members/${id}`, { 
                method: "GET" 
            });

            if (response.ok) {
                const member = await response.json();
                setMember(member);
                console.log("Le détail du membre :", member);
            } else {
                throw new Error("Erreur de récupération des données");
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erreur de connexion :", error);
                setError(error.message);
            } else {
                console.error("Erreur inconnue :", error);
                setError("Une erreur inconnue est survenue");
            }
        }
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (id) {
    getMemberById(id);
        }
    }, [id]); 

    const addOneYear = (date) => {
        return dayjs(date).add(1, 'year');
    };

    return (
        <>
            <div className='router-nav-container'>
                <ArrowLeft size={18} color='rgb(138, 43, 226)'/><Link to="/dashboard" className='router-nav'>retour</Link>
            </div>
            <h1>Page de détails de membre</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {member ? (
                <div className='details-container'>
                    <div className='details-left'>
                        <div className='logo-container'>
                            <img className='logo' src="/logo-details.svg" alt="logo" /> 
                            <h1>O'Tennis</h1>
                        </div>
                        <h2>{member.first_name} {member.last_name}</h2>
                        <p className='role'>{member.memberRoles[0].role_name}</p>
                        <p>N° de membre : {member.id}</p> 
                        <p>Date de naissance : {dayjs(member.date_of_birth).format('DD/MM/YYYY')}</p>
                        <p>{Age(member.date_of_birth)} ans</p>
                        <p>tel : {member.phone_number}</p>
                        <p>Email : {member.email}</p>
                    </div>
                    <div className='details-right'>
                        <img 
                            srcSet='/default_user-320w.webp 320w, 
                                    /default_user-480w.webp 480w, 
                                    /default_user-800w.webp 800w, 
                                    /default_user.webp' 
                            sizes='(max-width: 600px) 100vw, 
                                (max-width: 1024px) 50vw, 
                                33vw' 
                            alt='photo_membre' 
                        />
                        <div className='date-container'>
                            <div className='member-date'>
                                <p>Membre depuis le : </p>
                                <p className='i'>{dayjs(member.created_at).format('DD/MM/YYYY')}</p>
                            </div>
                            <div className='member-date'>
                                <p>Expire le : </p>
                                <i className='i'>{addOneYear(member.created_at).format('DD/MM/YYYY')}</i>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Chargement des détails...</p>
            )}
        </>
    );
}

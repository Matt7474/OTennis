import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";

export default function Dashboard() {
    
    const id = localStorage.getItem("memberId");
    const [, setError] = useState<string | null>(null);
    const [memberRole, setMemberRole] = useState<number | null>(null)
    const [, setMember] = useState<string>("")
    const [members, setMembers] = useState<any[]>([]);

    const getMember = async () => {

        try {

            const baseUrl: string = import.meta.env.VITE_BACKEND_BASE_URL;
            const response = await fetch(`${baseUrl}/members/${id}`, { 
                method: "GET" 
            });

            const member = await response.json();
            console.log("Données récupérées !", member);
            setMember(member)
           
            const roleId = member.memberRoles[0]?.id;
            setMemberRole(roleId);

            localStorage.setItem("memberRole", roleId);
            localStorage.setItem("memberFirstName", member.first_name);
            window.dispatchEvent(new Event("storage"));

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
        getMember();
    }, []);


    const getMembers = async () => {

        try {

            const baseUrl: string = import.meta.env.VITE_BACKEND_BASE_URL;
            const response = await fetch(`${baseUrl}/members/`, { 
                method: "GET" 
            });

            const members = await response.json();
            setMembers(members)
            console.log("La liste des membres !", members);

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


    return (
        <>
            <h1>Dashboard</h1>
    
            {memberRole === 1 && (
                <>
                    <p>Vous avez des privilèges de Super Administrateur.</p>
                    <p>Ne peut être vu que par les Super Admins</p>
                    <button type="button" onClick={getMembers}>Voir tous les membres</button>
                    <button type="button"> <Link to={"/addMember"}>Ajouter un nouveau membre</Link></button>
                    {members.map(member => {
                        return(
                            <div key={member.id}>
                                <Link to={`/details/${member.id}`} >
                                    <h2>{member.first_name} {member.last_name}</h2>
                                    <p>membre depuis le {dayjs(member.created_at).format('DD/MM/YYYY')}</p>
                                </Link>
                            </div>
                        )
                    })}
                </>
            )}
    
            {(memberRole === 2) && (
                <>
                    <p>Vous avez des privilèges d'Administrateur.</p>
                    <p>Ne peut être vu que par les Admins</p>
                    <button type="button" onClick={getMembers}>Voir tous les membres</button>
                    <button type="button"> <Link to={"/addMember"}>Ajouter un nouveau membre</Link></button>
                    {members.map(member => {
                        return(
                            <div key={member.id}>
                                <Link to={`/details/${member.id}`} >
                                    <h2>{member.first_name} {member.last_name}</h2>
                                    <p>membre depuis le {dayjs(member.created_at).format('DD/MM/YYYY')}</p>
                                </Link>
                            </div>
                        )
                    })}
                </>
            )}
    
            {memberRole === 3 && (
                <>
                    <p>Bienvenue cher membre</p>
                    <p>Ne peut être vu que par les Membres</p>
                </>
            )}
        </>
    );
    
}

import { useEffect, useState } from "react";

export default function Dashboard() {
    
    const id = localStorage.getItem("memberId");
    const [error, setError] = useState<string | null>(null);
    const [memberRole, setMemberRole] = useState<number | null>(null)
    const [member, setMember] = useState<string>("")

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

    return (
        <>
            <h1>Dashboard</h1>
    
            {memberRole === 1 && (
                <>
                    <p>Vous avez des privilèges de Super Administrateur.</p>
                    <p>Ne peut être vu que par les Super Admins</p>
                </>
            )}
    
            {memberRole === 2 && (
                <>
                    <p>Vous avez des privilèges d'Administrateur.</p>
                    <p>Ne peut être vu que par les Admins</p>
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

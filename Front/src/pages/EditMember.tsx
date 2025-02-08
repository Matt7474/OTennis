import { Check, X } from 'lucide-react'
import './EditMember.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AddMember from './AddMember'

export default function EditMember() {

    const {id} = useParams()
    const [editedMember, setEditedMember] = useState("");
    const [member, setMember] = useState()
    const [error, setError] = useState<Error>()
    const [loading, setLoading] = useState("")


    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() =>{

        const getMemberById = async (id: string) => {
            
            const baseUrl: string = import.meta.env.VITE_BACKEND_BASE_URL;
            const response = await fetch(`${baseUrl}/members/${id}`, { 
                method: "GET" 
            });
            
            if (response.ok) {
                const data = await response.json();
                setMember(data);
                console.log("Le détail du membre :", data);
            } else {
                throw new Error("Erreur de récupération des données");
            }    
            
        }
        if (id) {
            getMemberById(id);
        }       
    }, [id]);


    console.log(member);
    
 
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("edition du membre")
    }


    return(
        <>
            <h1>Page d'edition de Nom Prénom</h1>
            <form onSubmit={handleSubmit}>

                <div className='form-container'>

                    <div className='form-left'>

                        {/* /////////////////// Nom ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='last_name'>Nom :</label>
                            <div className="check">
                                <input 
                                    type='text' 
                                    id='last_name' 
                                    value={member.last_name} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    required
                                    className={last_name.length >= 2 ? "valid" : "invalid"} 
                                />
                                {last_name.length >= 2 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>
                    </div>
                </div>  

            </form>
       
        </>

    )
}
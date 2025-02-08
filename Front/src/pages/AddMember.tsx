import { useState } from 'react'
import './AddMember.css'
import { Check, X } from 'lucide-react';
import './AddMember.css'
import { useNavigate } from 'react-router-dom';



export default function AddMember() {

    const [last_name, setLastName] = useState<string>("")
    const [first_name, setFirstName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [date_of_birth, setDateBirth] = useState<string>("");
    const [phone_number, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [photo, setPhoto] = useState<string>("");

    const [street_number, setStreetNumber] = useState<number | "">("");
    const [address_extra, setAddressExtra] = useState<string>("");
    const [street_name, setStreetName] = useState<string>("");
    const [zip_code, setZipCode] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [password, setPassword] = useState<string>("Par dessus les nuages");
    
    const [preview, setPreview] = useState<string | null>(null);
    const [, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();  

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(String);
            setPreview(URL.createObjectURL(file)); // Génère un aperçu de l'image
        }
    };

    const handleSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault()
        console.log("formulaire soumis");

        try{
            const baseUrl:string = import.meta.env.VITE_BACKEND_BASE_URL;
            const response = await fetch(`${baseUrl}/members`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({last_name, first_name, gender, date_of_birth, phone_number, email, photo, street_number, address_extra, street_name, zip_code, city, country, password})
            });
            
            const data = await response.json()
            console.log("Ajout du membre reussi !", data);
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
            <h1>Page d'ajout d'un nouveau membre</h1>

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
                                    value={last_name} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    required
                                    className={last_name.length >= 2 ? "valid" : "invalid"} 
                                />
                                {last_name.length >= 2 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Prénom ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='first_name'>Prénom :</label>
                            <div className="check">
                                <input 
                                    type='text' 
                                    id='first_name' 
                                    value={first_name} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    required
                                    className={first_name.length >= 2 ? "valid" : "invalid"} 
                                />
                                {first_name.length >= 2 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Sexe ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='gender'>Sexe :</label>
                            <div className='select'>
                                <select name="gender" 
                                id="gender" 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)} 
                                required 
                                className={gender.length >= 2 ? "valid" : "invalid"}>
                                    <option value="">-- Choisissez une option --</option>
                                    <option value="Femme">Femme</option>
                                    <option value="Homme">Homme</option>
                                    <option value="non précisé">non précisé</option>
                                </select>                          
                                {gender.length >= 2 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Date de naissance ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='date_birth'>Date de naissance :</label>
                            <div className="check">
                                <input type="date" 
                                name="date_birth" 
                                id="date_birth" 
                                value={date_of_birth} 
                                onChange={(e) => setDateBirth(e.target.value)} 
                                required
                                className={date_of_birth.length >= 10 ? "valid" : "invalid"} 
                                />
                                {date_of_birth.length >= 10 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Num de tél ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='phone_number'>Num de tél :</label>
                            <div className="check">
                                <input 
                                    type='text' 
                                    id='phone_number' 
                                    value={phone_number} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    required
                                    className={phone_number.length === 10 ? "valid" : "invalid"} 
                                />
                                {phone_number.length === 10 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Email ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='email'>Email :</label>
                            <div className="check">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={isValidEmail(email) ? "valid" : "invalid"}
                            />
                            {isValidEmail(email) ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Photo ////////////////// */}
                        <div className="input-container">
                            <label htmlFor="photo">Photo :</label>
                            <div className="check">
                                <input
                                    type="file"
                                    id="photo"
                                    accept="image/*" // Permet seulement les images
                                    onChange={handleFileChange}
                                    className={photo ? "valid" : "invalid"}
                                />
                                {photo ? <Check color="green" /> : <X color="red" />}
                            </div>

                            {/* Afficher l'aperçu de l'image sélectionnée */}
                            {preview && (
                                <div className="preview-container">
                                    <p>Aperçu :</p>
                                    <img src={preview} 
                                    alt="Aperçu de l'image" 
                                    className="preview-image" />
                                </div>
                            )}
                        </div>
                       
                    </div>

                   

                    <div className='form-right'>

                        {/* /////////////////// Num de rue ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='street_number'>N° de rue :</label>
                            <div className="check">
                                <input 
                                    type='number' 
                                    id='street_number' 
                                    value={street_number} 
                                    onChange={(e) => setStreetNumber(e.target.value === "" ? "" : Number(e.target.value))} 
                                    required
                                    className={street_number !== "" ? "valid" : "invalid"} 
                                />
                                {street_number !== "" ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Compl d'addresse ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='address_extra'>Compl. d'adresse :</label>
                            <div className="check">
                                <input 
                                    type='text' 
                                    id='address_extra' 
                                    value={address_extra} 
                                    onChange={(e) => setAddressExtra(e.target.value)} 
                                />
                            </div>
                        </div>

                        {/* /////////////////// Nom de rue ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='street_name'>Nom de rue :</label>
                            <div className="check">
                                <input 
                                    type='text' 
                                    id='street_name' 
                                    value={street_name} 
                                    onChange={(e) => setStreetName(e.target.value)} 
                                    required
                                    className={street_name.length >= 2 ? "valid" : "invalid"} 
                                />
                                {street_name.length >= 2 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Code postal ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='zip_code'>Code postal :</label>
                            <div className="check">
                                <input 
                                    type='text' 
                                    id='zip_code' 
                                    value={zip_code} 
                                    onChange={(e) => setZipCode(e.target.value)} 
                                    required
                                    className={zip_code.length === 5 ? "valid" : "invalid"} 
                                />
                                {zip_code.length === 5 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Ville ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='city'>Ville :</label>
                            <div className="check">
                                <input 
                                    type='text' 
                                    id='city' 
                                    value={city} 
                                    onChange={(e) => setCity(e.target.value)} 
                                    required
                                    className={city.length >= 3 ? "valid" : "invalid"} 
                                />
                                {city.length >= 3 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Pays ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='country'>Pays :</label>
                            <div className="check">
                                <input 
                                    type='text' 
                                    id='country' 
                                    value={city} 
                                    onChange={(e) => setCountry(e.target.value)} 
                                    required
                                    className={country.length >= 3 ? "valid" : "invalid"} 
                                />
                                {country.length >= 3 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                        {/* /////////////////// Mot de passe ////////////////// */}
                        <div className='input-container'>
                            <label htmlFor='password'>Mot de passe :</label>
                            <div className="check">
                                <input 
                                    type='password' 
                                    id='password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required
                                    className={password.length >= 6 ? "valid" : "invalid"} 
                                />
                                {password.length >= 6 ? <Check color="green" /> : <X color="red" />}
                            </div>
                        </div>

                    </div>

                </div>
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button id='btn-submit'>Enregistrer</button>

            </form>
        </>
    )
}


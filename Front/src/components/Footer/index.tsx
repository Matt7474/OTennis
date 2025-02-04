import './style.css'

export default function Footer() {

    const year = new Date().getFullYear();

    return(
        <>
            <div className='footer'>
                <div>
                    <p>© {year} O'Tennis. Tous droits réservés.</p>
                </div>
            </div>
        </>
    )
}
import dayjs from 'dayjs';

export function Age(dateNaissance: string) {
        
    const naissance = dayjs(dateNaissance, "DD/MM/YYYY");
    const aujourdHui = dayjs();

    let age = aujourdHui.year() - naissance.year();

    // Vérifier si l'anniversaire est passé cette année
    if (aujourdHui.month() < naissance.month() || 
       (aujourdHui.month() === naissance.month() && aujourdHui.date() < naissance.date())) {
        age--;
    }

    return age;
}
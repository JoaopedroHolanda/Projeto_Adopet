import PetEntity from "../entities/PetEntity";

type TipoRequestBodyPet = Omit<PetEntity, "id">
type TipoResponseBodyPet = {
    dados?: Pick<PetEntity, "id"|"nome"|"porte" |"especie"> | Pick<PetEntity, "id"|"nome"|"porte" |"especie">[]
}
type TipoRequestParamsPet ={id?: string, pet_id?:string, adotante_id?:string}

export {TipoRequestBodyPet,TipoResponseBodyPet, TipoRequestParamsPet}
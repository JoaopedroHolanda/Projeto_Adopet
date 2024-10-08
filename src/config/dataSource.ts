import { DataSource } from "typeorm"
import PetEntity from "../entities/PetEntity"
import AdotanteEntity from "../entities/AdotanteEntity"
import EnderecoEntity from "../entities/Endereco"
import AbrigoEntity from "../entities/AbrigoEntity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    entities: [PetEntity, AdotanteEntity, EnderecoEntity, AbrigoEntity],
    synchronize: true
})
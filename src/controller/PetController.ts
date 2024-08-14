import e, { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";


export default class PetController{

    constructor(private repository: PetRepository){

    }
    criaPet(req: Request, res: Response){
        const {adotado,especie,porte,dataDeNascimento,nome} = <PetEntity>req.body
        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(400).json({error: "Espécie inválida"})
        }

        if(porte && !(porte in EnumPorte)){
            return res.status(400).json({error: "Porte Inválido"})
        }

        const novoPet: PetEntity = new PetEntity(nome,especie,dataDeNascimento,adotado,porte)
        this.repository.criaPet(novoPet)
        return res.status(201).json(novoPet)
    }

    async listaPet(req: Request, res: Response) {
        const listaDePets = await this.repository.listaPet();
        return res.status(200).json(listaDePets);
      }

    async atualizaPet(req: Request, res: Response){
        const {id} = req.params
        const {success, message} = await this.repository.atualizaPet(
            Number(id),
            req.body as PetEntity
        )
        if(!success){
            return res.status(404).json({message})
        }
        return res.sendStatus(204)
    }

    async deletaPet(req: Request, res: Response) {
        const { id } = req.params;
    
        const { success, message } = await this.repository.deletaPet(Number(id));
    
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
      }
    
    async adotaPet(req: Request, res: Response){
        const {pet_id, adotante_id} = req.params

        const {success, message} = await this.repository.adotaPet(Number(pet_id), Number(adotante_id))

        if(!success){
            return res.status(404).json({message})
        }
        return res.sendStatus(204)
    }
    
    async buscaPetPorCampoGenerico(req: Request, res: Response){
        const {campo,valor} = req.query
        const listaDePets = await this.repository.buscaPetPorCampoGenerico(campo as keyof PetEntity, valor as string)
        return res.status(200).json(listaDePets)
    }
}
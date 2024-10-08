
import { Repository } from "typeorm";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepository";
import AbrigoEntity from "../entities/AbrigoEntity";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";
import EnderecoEntity from "../entities/Endereco";

export default class AbrigoRepository implements InterfaceAbrigoRepository{
    private repository: Repository<AbrigoEntity>

    constructor(repository: Repository<AbrigoEntity>){
        this.repository = repository
    }

    private async existeAbrigoComcelular(celular: string): Promise<boolean>{
        return !!(await this.repository.findOne({where: {celular}}))
    }

    private async existeAbrigoComEmail(email: string): Promise<boolean>{
        return !!(await this.repository.findOne({where: {email}}))
    }

    async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
        if(await this.existeAbrigoComcelular(abrigo.celular) || await this.existeAbrigoComEmail(abrigo.email)){
            throw new RequisicaoRuim("Já existe um abrigo com esse celular ou email!")
        }

        await this.repository.save(abrigo)
    }


    async listaAbrigos(): Promise<AbrigoEntity[]>{
        return this.repository.find()
    }

    async atualizaAbrigo(id: number, newData: AbrigoEntity){
        const abrigoToUpdate = await this.repository.findOne({ where: { id } });
    
        if(!abrigoToUpdate){
            throw new NaoEncontrado("Abrigo não encontrado");
        }
    
        Object.assign(abrigoToUpdate, newData);
        await this.repository.save(abrigoToUpdate);
    
        return { success: true };
    }
    

    async deletaAbrigo(id: number){
        const abrigoToRemove = await this.repository.findOne({ where: { id } });

        if(!abrigoToRemove){
            throw new NaoEncontrado("Abrigo não encontado")
        }

        await this.repository.remove(abrigoToRemove);

      return { success: true };
    }
    
   async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity) {
    const abrigo = await this.repository.findOne({
      where: { id: idAbrigo },
    });

    if (!abrigo) {
      throw new NaoEncontrado("Abrigo não encontrado!");
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    abrigo.endereco = novoEndereco;
    await this.repository.save(abrigo);
  }


}
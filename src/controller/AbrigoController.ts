import { Request, Response } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { TipoRequestBodyAbrigo, TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from "../tipos/tiposAbrigo";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/Endereco";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";



export default class AbrigoController{

    constructor( private repository: AbrigoRepository){
        this.repository = repository
    }

    async criaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>){
        const { nome, celular, email, senha, endereco } = req.body;
        const novoAbrigo = new AbrigoEntity(nome, celular, email, senha, endereco);

    await this.repository.criaAbrigo(novoAbrigo);
    return res.status(201).json({ dados: { id: novoAbrigo.id, nome, celular, email, endereco } });
    }

    async listaAbrigos(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>){
        const listaAbrigos = await this.repository.listaAbrigos()

        const dados = listaAbrigos.map((abrigo)=>{return {id: abrigo.id, nome: abrigo.nome,email:abrigo.email, celular: abrigo.celular, endereco: abrigo.endereco !== null?abrigo.endereco:undefined}})
        return res.status(200).json({dados})
    }

    async atualizaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>){
        const {id} = req.params

        await this.repository.atualizaAbrigo(
            Number(id),
            req.body as AbrigoEntity
        )
      
        return res.sendStatus(204)
    }

    async deletaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>){
        const {id} = req.params

        await this.repository.deletaAbrigo(
            Number(id)
        )
        return res.sendStatus(204)
    }

    async atualizaEnderecoAbrigo(req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>, res: Response<TipoResponseBodyAbrigo>){
        const {id} = req.params
        await this.repository.atualizaEnderecoAbrigo(Number(id), req.body);
    
        return res.sendStatus(EnumHttpStatusCode.OK);
    }
}
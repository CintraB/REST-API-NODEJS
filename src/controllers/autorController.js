import naoEncontrado from "../erros/naoEncontrado.js";
import { autor }  from "../models/Autor.js";

class AutorController{

  static async listarAutores(req,res,next){

    try {
      const listaAutores = await autor.find({}); //procura por tudo na colecao de livros
      if(listaAutores !== null){
        res.status(200).json(listaAutores);
      }else{
        next(new naoEncontrado("Nenhum autor cadastrado foi encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarAutor (req,res,next){
    try{
      const novoAutor = await autor.create(req.body);
      res.status(201).json({message: "criado com sucesso", autor: novoAutor});
    }catch(error){
      next(error);
    }
        
  }

  static async listarAutorPorId(req,res,next){

    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id); //procura pelo ID do autor
      if(autorEncontrado !== null){
        res.status(200).json(autorEncontrado);
      }else{
        next(new naoEncontrado("ID do autor não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async atualizarAutor(req,res,next){
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndUpdate(id,req.body); //procura pelo ID do autor e atualiza
      if(autorResultado !== null){
        res.status(200).json({message: "autor atualizado"});
      }else{
        next(new naoEncontrado("ID do autor não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async excluirAutor(req,res,next){

    try {
      const id = req.params.id;
      const autorResultadoExcluir = await autor.findByIdAndDelete(id); //procura pelo ID do autor e deleta
      
      if(autorResultadoExcluir !== null){
        res.status(200).json({message: "autor deletado com sucesso"});
      }else{
        next(new naoEncontrado("ID do autor não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

}

export default AutorController;
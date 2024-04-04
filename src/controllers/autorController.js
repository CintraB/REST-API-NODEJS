import { autor }  from "../models/Autor.js";

class AutorController{

  static async listarAutores(req,res,next){

    try {
      const listaAutores = await autor.find({}); //procura por tudo na colecao de livros
      res.status(200).json(listaAutores);
    } catch (error) {
      //res.status(500).json({message: `${error.message} - falha na requisição`});
      next(error);
    }
  }

  static async cadastrarAutor (req,res,next){
    try{
      const novoAutor = await autor.create(req.body);
      res.status(201).json({message: "criado com sucesso", autor: novoAutor});
    }catch(error){
      //res.status(500).json({message: `${error.message} - falha ao cadastrar autor`});
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
        res.status(404).json({message: "ID do autor não encontrado."});
      }
    } catch (error) {
      next(error);
    }
  }

  static async atualizarAutor(req,res,next){

    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id,req.body); //procura pelo ID do autor e atualiza
      res.status(200).json({message: "autor atualizado"});
    } catch (error) {
      //res.status(500).json({message: `${error.message} - falha na atualização do autor`});
      next(error);
    }
  }

  static async excluirAutor(req,res,next){

    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id); //procura pelo ID do autor e deleta
      res.status(200).json({message: "autor deletado com sucesso"});
    } catch (error) {
      //res.status(500).json({message: `${error.message} - falha ao deletar o autor`});
      next(error);
    }
  }

}

export default AutorController;
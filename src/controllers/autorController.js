import { autor }  from "../models/Autor.js";

class AutorController{

  static async listarAutores(req,res){

    try {
      const listaAutores = await autor.find({}); //procura por tudo na colecao de livros
      res.status(200).json(listaAutores);
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha na requisição`});
    }
  }

  static async cadastrarAutor (req,res){
    try{
      const novoAutor = await autor.create(req.body);
      res.status(201).json({message: "criado com sucesso", autor: novoAutor});
    }catch(error){
      res.status(500).json({message: `${error.message} - falha ao cadastrar autor`});
    }
        
  }

  static async listarAutorPorId(req,res){

    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id); //procura pelo ID do autor
      res.status(200).json(autorEncontrado);
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha na requisição do autor`});
    }
  }

  static async atualizarAutor(req,res){

    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id,req.body); //procura pelo ID do autor e atualiza
      res.status(200).json({message: "autor atualizado"});
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha na atualização do autor`});
    }
  }

  static async excluirAutor(req,res){

    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id); //procura pelo ID do autor e deleta
      res.status(200).json({message: "autor deletado com sucesso"});
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha ao deletar o autor`});
    }
  }

}

export default AutorController;
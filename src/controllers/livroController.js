import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController{

  static async listarLivros(req,res){

    try {
      const listaLivros = await livro.find({}); //procura por tudo na colecao de livros
      res.status(200).json(listaLivros);
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha na requisição`});
    }
  }

  static async cadastrarLivro (req,res){
    const novoLivro = req.body;
    try{
      const autorEncontrado = await autor.findById(novoLivro.autor); //encontrar o autor pelo ID
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc}}; //montar objeto composto pelos dados do livro e do autor atribuido
      const livroCriado = await livro.create(livroCompleto); //criar o objeto
      res.status(201).json({message: "criado com sucesso", livro: livroCriado});
    }catch(error){
      res.status(500).json({message: `${error.message} - falha ao cadastrar livro`});
    }
        
  }

  static async listarLivroPorId(req,res){

    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id); //procura pelo ID do livro
      res.status(200).json(livroEncontrado);
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha na requisição do livro`});
    }
  }

  static async atualizarLivro(req,res){

    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id,req.body); //procura pelo ID do livro e atualiza
      res.status(200).json({message: "livro atualizado"});
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha na atualização do livro`});
    }
  }

  static async excluirLivro(req,res){

    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id); //procura pelo ID do livro e deleta
      res.status(200).json({message: "livro deletado com sucesso"});
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha ao deletar o livro`});
    }
  }

  static async listarLivroPorEditora (req,res){
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora}); //propriedade: const
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      res.status(500).json({message: `${error.message} - falha na busca`});
    }
  }



}

export default LivroController;
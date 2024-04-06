import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
import naoEncontrado from "../erros/naoEncontrado.js";

class LivroController{

  static async listarLivros(req,res,next){

    try {
      const listaLivros = await livro.find({}); //procura por tudo na colecao de livros
      if(listaLivros !== null){
        res.status(200).json(listaLivros);
      }else{
        next(new naoEncontrado("Nenhum livro cadastrado foi encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro (req,res,next){
    const novoLivro = req.body;
    try{
      const autorEncontrado = await autor.findById(novoLivro.autor); //encontrar o autor pelo ID
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc}}; //montar objeto composto pelos dados do livro e do autor atribuido
      const livroCriado = await livro.create(livroCompleto); //criar o objeto
      res.status(201).json({message: "criado com sucesso", livro: livroCriado});
    }catch(error){
      next(error);
    }
        
  }

  static async listarLivroPorId(req,res,next){

    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id); //procura pelo ID do livro
      if(livroEncontrado !== null){
        res.status(200).json(livroEncontrado);
      }else{
        next(new naoEncontrado("ID do livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req,res,next){

    try {
      const id = req.params.id;
      const livroAtualizado = await livro.findByIdAndUpdate(id,req.body); //procura pelo ID do livro e atualiza

      if(livroAtualizado !== null){
        res.status(200).json({message: "livro atualizado"});
      }else{
        next(new naoEncontrado("ID do livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async excluirLivro(req,res,next){

    try {
      const id = req.params.id;
      const livroExcluir = await livro.findByIdAndDelete(id); //procura pelo ID do livro e deleta
      
      if(livroExcluir !== null){
        res.status(200).json({message: "livro deletado com sucesso"});
      }else{
        next(new naoEncontrado("ID do livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorEditora (req,res,next){
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora}); //propriedade: const
      console.log(livrosPorEditora);
      if(livrosPorEditora.length > 0){ //o retorno da função find array vazio [] e não null, assim verificando o tamanho do array.
        res.status(200).json(livrosPorEditora);
      }else{
        next(new naoEncontrado("Nenhum livro encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }



}

export default LivroController;
import livro from "../models/Livro.js";

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
        try{
            const novoLivro = await livro.create(req.body);
            res.status(201).json({message: "criado com sucesso", livro: novoLivro});
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

};

export default LivroController;
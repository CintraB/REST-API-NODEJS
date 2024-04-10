import { livro } from "../models/index.js";
import { autor } from "../models/index.js";
import naoEncontrado from "../erros/naoEncontrado.js";

class LivroController {

  static listarLivros = async (req, res, next) => {

    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next();
    } catch (error) {
      next(error);
    }
  };

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor); //encontrar o autor pelo ID
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } }; //montar objeto composto pelos dados do livro e do autor atribuido
      const livroCriado = await livro.create(livroCompleto); //criar o objeto
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (error) {
      next(error);
    }

  }

  static async listarLivroPorId(req, res, next) {

    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id); //procura pelo ID do livro
      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new naoEncontrado("ID do livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {

    try {
      const id = req.params.id;
      const livroAtualizado = await livro.findByIdAndUpdate(id, req.body); //procura pelo ID do livro e atualiza

      if (livroAtualizado !== null) {
        res.status(200).json({ message: "livro atualizado" });
      } else {
        next(new naoEncontrado("ID do livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async excluirLivro(req, res, next) {

    try {
      const id = req.params.id;
      const livroExcluir = await livro.findByIdAndDelete(id); //procura pelo ID do livro e deleta

      if (livroExcluir !== null) {
        res.status(200).json({ message: "livro deletado com sucesso" });
      } else {
        next(new naoEncontrado("ID do livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {

    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livro.find(busca);

        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }


    } catch (error) {
      next(error);
    }
  };

}

async function processaBusca(parametros) {

  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  const busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" }; //buscando de forma dinamica colocando as buscas na variavel "busca", usando operadores do mongoDB


  if (minPaginas || maxPaginas) {
    busca.paginas = {};
  }

  //gte = maior ou igual que
  if (minPaginas) busca.paginas.$gte = minPaginas;
  //lte = menor ou igual que
  if (maxPaginas) busca.paginas.$lte = maxPaginas;


  if (nomeAutor) {
    const autorEncontrado = await autor.findOne({ nome: nomeAutor });
    busca.autor = autorEncontrado;
  }

  return busca;

}

export default LivroController;
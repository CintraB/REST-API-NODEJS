import erroBase from "./erroBase.js";

class naoEncontrado extends erroBase{
  constructor(mensagem = "Página não encontrada."){
    super(mensagem,404);
  }
}

export default naoEncontrado;
import erroBase from "./erroBase.js";

class naoEncontrado extends erroBase{
  constructor(){
    super("Página não encontrada.",404);
  }
}

export default naoEncontrado;
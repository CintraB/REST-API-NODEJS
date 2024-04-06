import requisicaoIncorreta from "./requisicaoIncorreta.js";

class erroValidacao extends requisicaoIncorreta{
  constructor(error){
    const mensagensErro = Object.values(error.errors).map(error => error.message).join("; ");
    super(`Os seguintes erros foram encontrados: ${ mensagensErro}`);
  }
}

export default erroValidacao;
import mongoose from "mongoose";
import erroBase from "../erros/erroBase.js";
import requisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import erroValidacao from "../erros/errroValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new requisicaoIncorreta().enviarResposta(res);
  } else if(error instanceof mongoose.Error.ValidationError){
    new erroValidacao(error).enviarResposta(res);
  } else{
    new erroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
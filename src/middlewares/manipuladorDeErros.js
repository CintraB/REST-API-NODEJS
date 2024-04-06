import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: "Os dados fornecidos estão incorretos." });
  } else if(error instanceof mongoose.Error.ValidationError){
    const mensagensErro = Object.values(error.errors).map(error => error.message).join("; ");
    res.status(400).send({message: `Os seguintes erros foram encontrados: ${ mensagensErro}`});
  } {
    res.status(500).json({ message: `${error.message} - Erro interno de servidor.` });
  }
}

export default manipuladorDeErros;
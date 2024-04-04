import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: "Os dados fornecidos estão incorretos." });
  } else {
    res.status(500).json({ message: `${error.message} - Erro interno de servidor.` });
  }
}

export default manipuladorDeErros;
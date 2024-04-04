import mongoose, { mongo } from "mongoose";
import { autorSchema } from "./Autor.js";

const livrosSChema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number },
    autor: autorSchema
}, { versionKey: false });

const livro = mongoose.model("livros", livrosSChema);

export default livro;
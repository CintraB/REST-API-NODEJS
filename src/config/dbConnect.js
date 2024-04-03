import mongoose from "mongoose";
async function conectaNaDatabase(){
    //mongoose.connect("mongodb+srv://admincintra:<admin123>@cluster0.948hnhz.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0");
    mongoose.connect(process.env.DB_CONNECTION_STRING);

    return mongoose.connection;
};

export default conectaNaDatabase;



const mongoose = require("mongoose");



const conexion = async() =>{
    try {
        await mongoose.connect(`${process.env.MONGOURI}`);
        console.log("Conexion con exito");
    } catch (error) {
        console.log(error);
        throw new Error("Fallo al conectarse a la base de datos");
    }
}

module.exports = conexion;
require ("dotenv").config();
const express = require ("express");
const cors = require("cors");
const conexion = require("./database/config");
const app = express();

conexion();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => { //headers en el req y el bodies en el res
    res.send("Hola mundo desde servidor HTTP")
})

app.use("/api/clientes", require ("./routes/clientes"));
app.use("/api/servicios", require ("./routes/servicios"));
app.use("/api/motos", require ("./routes/motos"));

app.listen(process.env.PORT ,() =>{
    console.log(`App escuchando en : http://localhost:${process.env.PORT}`);
})
const Moto = require("../models/Moto");
const Servicio = require("../models/Servicio");

const ObtenerMotos = async(_, res) => {
    try{    
        const motos =  await Moto.find({}).populate("cliente", "nombres apellidos");

        if(motos.length === 0){
            return res.status(404).json({
                ok: false,
                msg: "No existen motos en la base de datos",
            })
        }
        return res.json({
            ok: true,
            msg: "Motos obtenidas con exito",
            motos: motos
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const obtenerMoto = async(req, res) =>{
    try {
        const id = req.params.id;
        const result = await Moto.findById({_id: id}).populate("cliente","nombres apellidos");

        if(!result){
            return res.status(404).json({
                ok: false,
                msg: "No existe moto con ese ID"
            })
        }
        return res.json({
            ok: true,
            moto: result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const obtenerMotosPorCliente = async(req, res) =>{
    try {
        const cliente = req.params.cliente;
        const motos = await Moto.find({cliente: cliente}).populate("cliente","nombres apellidos");

        if(motos.length === 0){
            return res.status(404).json({
                ok: false,
                msg: "No existe moto con ese cliente en la base de datos"
            })
        }

        return res.json({
            ok: true,
            msg: "Motos obtenidas con exito",
            motos: motos
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const agregarMoto = async(req, res) => {
    try {
        const moto =  req.body;
        const nuevaMoto = new Moto(moto);
        await nuevaMoto.save();

        res.json({
            ok: true,
            msg: "Moto agregada con exito"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}
const actualizarMoto = async(req, res) =>{
    try{
        const motoID = req.params.id
        const moto = await Moto.findById(motoID)
        if(!moto){
            return res.status(404).json({
                ok: false,
                msg: "No existe la moto"
            })
        }
        await Moto.findByIdAndUpdate(motoID, req.body)

        return res.json({
            ok: true,
            msg: "Moto actualizada"
        })

    }catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const eliminarMoto = async(req, res) => {
    try{
        const motoID = req.params.id
        const moto = await Moto.findById(motoID);

        if(!moto){
            return res.status(404).json({
                ok: false,
                msg: "No existe la moto"
            })
        }
        
        await Servicio.deleteMany({moto: motoID})
        await Moto.findByIdAndDelete(moto);
        return res.json({
            ok: true,
            msg: "Moto eliminada"
        })


    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

module.exports = {
    ObtenerMotos,
    obtenerMoto,
    obtenerMotosPorCliente,
    agregarMoto,
    actualizarMoto,
    eliminarMoto
}
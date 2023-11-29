const Servicio = require("../models/Servicio");
const Cliente = require("../models/Cliente");
const Moto = require("../models/Moto");


const obtenerServicios = async (_,res) => {
    try {
        
        const servicios = await Servicio.find({}).populate({
            path: "moto",
            populate: [{path: "marca modelo color cliente"}],
        });

        if(servicios.length === 0){
            return res.status(404).json({
                ok: false,
                msg: "No existe servicios agregados"
            })
        }
        return res.json({
            ok: true,
            msg: "Servicios obtenidos con exito",
            servicios: servicios
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}
const obtenerServiciosPorMoto = async(req, res) => {
    try {
        
        const motoid = req.params.moto;
        const servicioMoto = await Servicio.find({moto: motoid});

        if(servicioMoto.length === 0){
            return res.status(404).json({
                ok: false,
                msg: "No se encontraron servicios para esa moto"
            })
        }
        return res.json({
            ok: true,
            msg: "Servicios encontrados con exito",
            servicioMoto: servicioMoto
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}
const obtenerServicio = async(req, res) => {
    try {
        
        const id = req.params.id
        const result = await Servicio.findById(id).populate([
            {
                path: "moto",
                populate: [{path: "marca modelo color cliente"}],
            },
        ]);

        if(!result){
            return res.status(404).json({
                ok: false,
                msg: "No existe ese servicio por ID"
            })
        }

        return res.json({
            ok: true,
            msg: "Servicios Obtenidos con exito",
            servicio: result
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const agregarServicio = async(req, res) => {
    try {
        const servicio = new Servicio(req.body);
        await servicio.save();

        return res.json({
            ok: true,
            msg: "Servicio Agregado con exito",
            servicio: servicio._id
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const agregarServicioCompleto = async(req,res) =>{
    try{

        const servicioCompleto = req.body;

        const cliente = {
            nombres: servicioCompleto.nombres,
            apellidos: servicioCompleto.apellidos,
            direccion: servicioCompleto.direccion,
            email: servicioCompleto.email,
            telefono: servicioCompleto.telefono,
            whatsapp: servicioCompleto.whatsapp,
        };
        const nuevoCliente = new Cliente(cliente);
        await nuevoCliente.save();

        const moto = {
            marca: servicioCompleto.marca,
            modelo: servicioCompleto.modelo,
            cilindrada: servicioCompleto.cilindrada,
            placa: servicioCompleto.placa,
            color: servicioCompleto.color,
            tipo: servicioCompleto.tipo,
            cliente: nuevoCliente._id,
        };
        const nuevaMoto = new Moto(moto);
        await nuevaMoto.save();

        const servicio = {
            fecha: servicioCompleto.fecha,
            anticipo: servicioCompleto.anticipo,
            kilometraje: servicioCompleto.kilometraje,
            combustible: servicioCompleto.combustible,
            concepto: servicioCompleto.concepto,
            presupuesto: servicioCompleto.presupuesto,
            observaciones: servicioCompleto.observaciones,
            proximo: servicioCompleto.proximo,
            moto: nuevaMoto._id,
        };

        const nuevoServicio = new Servicio(servicio);
        await nuevoServicio.save();

        return res.json({
            ok: true,
            msg: "El cliente, la moto y el servicio fueron agregados con exito",
            servicio: nuevoServicio._id
        })

    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const agregarServicioCliente = async(req, res) => {
    try{
    const servicioCliente = req.body;
    const moto = {
        marca: servicioCliente.marca,
        modelo: servicioCliente.modelo,
        cilindrada: servicioCliente.cilindrada,
        placa: servicioCliente.placa,
        color: servicioCliente.color,
        tipo: servicioCliente.tipo,
        cliente: servicioCliente.cliente,
    }

    const nuevaMoto = new Moto(moto);
    await nuevaMoto.save();

    const servicio = {
        fecha: servicioCliente.fecha,
        anticipo: servicioCliente.anticipo,
        kilometraje: servicioCliente.kilometraje,
        combustible: servicioCliente.combustible,
        concepto: servicioCliente.concepto,
        presupuesto: servicioCliente.presupuesto,
        observaciones: servicioCliente.observaciones,
        proximo: servicioCliente.proximo,
        moto: nuevaMoto._id,
    }
    const nuevoServicio = new Servicio(servicio);
    await nuevoServicio.save();

    return res.json({
        ok: true,
        msg: "La moto y el servicio han sido agregados correctamente",
        servicio: nuevoServicio._id
    })

    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }

}

const agregarServicioClienteMoto = async(req, res) => {
    try {
        const servicioClienteMoto = req.body;
        const servicio = {
            fecha: servicioClienteMoto.fecha,
            anticipo: servicioClienteMoto.anticipo,
            kilometraje: servicioClienteMoto.kilometraje,
            combustible: servicioClienteMoto.combustible,
            concepto: servicioClienteMoto.concepto,
            presupuesto: servicioClienteMoto.presupuesto,
            observaciones: servicioClienteMoto.observaciones,
            proximo: servicioClienteMoto.proximo,
            moto: servicioClienteMoto.moto, 
        }

        const nuevoServicio = new Servicio(servicio);
        await nuevoServicio.save();

        return res.json({
            ok: true,
            msg: "El servicio a sigo agregado correctamente",
            servicio: nuevoServicio._id
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}
const actualizarServicio = async(req,res) => {
    try {
        const servicioID = req.params.id
        const servicio = await Servicio.findById(servicioID)
        if(!servicio){
            return res.status(404).json({
                ok: false,
                msg: "No existe el servicio"
            })
        }
        await Servicio.findByIdAndUpdate(servicioID, req.body)

        return res.json({
            ok: true,
            msg: "Servicio actualizado"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}
const eliminarServicio = async(req, res) => {
    try {
        const servicioID = req.params.id
        const servicio = await Servicio.findById(servicioID)
        if(!servicio){
            return res.status(404).json({
                ok: false,
                msg: "No existe ese servicio por ID"
            })
        }
        await Servicio.findByIdAndDelete(servicioID)

        return res.json({
            ok: true,
            msg: "Servicio Eliminado"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}
const proximoServicios = async(_,res)=> {
    try{
        const serviciosProximos = await Servicio.find({proximo: {$gte: `${new Date().toISOString()}`}}).sort({proximo: "asc"}).populate([
            {
                path: "moto",
                populate: [{path: "marca modelo color cliente"}],
            },
        ]);

        if(serviciosProximos.length === 0){
            return res.status(404).json({
                ok: false,
                msg: "No hay proximos servicios",
            });
        }
        return res.json({
            ok: true,
            data: serviciosProximos,
        });
    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error contacta con el admin"
        })
    }
}
module.exports = {
    obtenerServicio,
    obtenerServicios,
    obtenerServiciosPorMoto,
    agregarServicio,
    agregarServicioCompleto,
    agregarServicioCliente,
    agregarServicioClienteMoto,
    actualizarServicio,
    eliminarServicio,
    proximoServicios
}
const Cliente = require("../models/Cliente");
const Moto = require("../models/Moto");
const Servicio = require("../models/Servicio");

const obtenerClientes = async(_, res) => {
    try {
        const clientes = await Cliente.find({});

        if(clientes.length === 0){
            return res.status(404).json({
                ok: false,
                msg: "No existen clientes"
            })
        }

        return res.json({
            ok: true,
            msg: "Clientes obtenidos con exito",
            clientes: clientes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}
const obtenerClientePorId =  async(req,res)=> {
    try{
        const id = req.params.id;
        const cliente = await Cliente.findById({_id: id});

        if(!cliente){
            return res.status(404).json({
                ok: false,
                msg: "No existe cliente con ese id"
            })
        }
            return res.json({
                ok: true,
                msg: "cliente obtenido con exito",
                cliente: cliente
            })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const obtenerClientePorNombre = async(req, res)=>{
    try{
        const nombreCliente = req.params.nombre;
        const cliente = await Cliente.findOne({nombres: {$regex: nombreCliente, $options: 'i'} });

        if(cliente.length === 0){
            return res.status(404).json({
                ok: false,
                msg: "No existe ese cliente"
            })
        }
            return res.json({
                ok: true,
                msg: "cliente obtenido con exito",
                cliente: cliente
            })
    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const agregarCliente =  async(req,res)=>{
    try {
        const cliente = new Cliente(req.body);

        await cliente.save();

        return res.json({
            ok: true,
            msg: "Cliente agregado"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const actualizarCliente = async(req, res) =>{
    try{
        const clienteID = req.params.id
        const cliente = await Cliente.findById(clienteID)
        if(!cliente){
            return res.status(404).json({
                ok: false,
                msg: "No existe cliente"
            })
        }
        await Cliente.findByIdAndUpdate(clienteID, req.body)

        return res.json({
            ok: true,
            msg: "Cliente actualizado"
        })

    }catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Contacta con el admin"
        })
    }
}

const eliminarCliente = async(req, res) => {
    try{
        const clienteId = req.params.id
        const cliente = await Cliente.findById(clienteId);
        const moto =  await Moto.find({cliente: clienteId})

        if(!cliente){
            return res.status(404).json({
                ok: false,
                msg: "No existe cliente"
            })
        }
        moto.map(async(moto)=> await Servicio.deleteMany({moto: moto._id}))
        await Moto.deleteMany({cliente: clienteId})
        await Cliente.findByIdAndDelete(clienteId);
        return res.json({
            ok: true,
            msg: "Cliente eliminado"
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
    obtenerClientes,
    obtenerClientePorId,
    obtenerClientePorNombre,
    agregarCliente,
    actualizarCliente,
    eliminarCliente
}
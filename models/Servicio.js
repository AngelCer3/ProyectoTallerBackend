const {Schema, model} = require ("mongoose");

const ServicioSchema = new Schema({
    fecha: {
        type: String,
        required: true
    },
    anticipo: {
        type: String,
        required: true
    },
    kilometraje: {
        type: String,
        required: true
    },
    combustible: {
        type: String,
        required: true
    },
    concepto: {
        type: String,
        required: true
    },
    presupuesto: {
        type: String,
        required: true
    },
    observaciones: {
        type: String,
        required: true
    },
    proximo: {
        type: String,
        required: true
    },
    moto: {
        type: Schema.Types.ObjectId,
        ref: "Moto",
        required: true
    }
});

module.exports = model("Servicio", ServicioSchema);
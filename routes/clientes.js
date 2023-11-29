const { Router } = require("express");

const { obtenerClientes,obtenerClientePorId,obtenerClientePorNombre,agregarCliente,actualizarCliente,eliminarCliente} = require("../controllers/clientes");
const { check, validationResult } = require("express-validator");
const{ param } = require ("express-validator");
const {validarCampos} = require("../middlewares/validarCampos");

const router = Router();

router.get("/", obtenerClientes) //middelwares son los intermediarios entre el servidor y el cliente y valida peticiones

router.get("/busqueda/id/:id",[
    param("id", "id no valido").notEmpty().isLength({min:24}),
    validarCampos
],obtenerClientePorId);

router.get("/busqueda/nombre/:nombre",[
    param("nombre", "Nombre no valido").notEmpty(),
    validarCampos
], obtenerClientePorNombre);

router.post("/",[
    check("nombres", "No puede ir vacio").not().isEmpty(),
    check("apellidos", "No puede ir vacio").notEmpty(),
    check("telefono", "No es un telefono vacio").notEmpty().isLength({min: 10, max: 14}),
    check("email", "No es un email valido").isEmail(),
    check("whatsapp", "No puede ir vacio").notEmpty().isLength({min: 10, max:14}),
    validarCampos
], agregarCliente);

router.put("/:id",[
    param("id","Id no valido").notEmpty().isLength({min: 24}),
    check("nombres", "No puede ir vacio").notEmpty(),
    check("apellidos", "No puede ir vacio").notEmpty(),
    check("telefono", "No es un telefono valido").notEmpty().isLength({min: 10, max: 14}),
    check("email", "No es un email valido").isEmail(),
    check("whatsapp", "No es un whats valido").notEmpty().isLength({min: 10, max:14}),
    validarCampos
], actualizarCliente);

router.delete("/:id",[
    param("id", "id no valido").notEmpty().isLength({min: 24}),
    validarCampos
], eliminarCliente);

module.exports = router;
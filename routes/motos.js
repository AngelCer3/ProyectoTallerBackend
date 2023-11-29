const {Router} = require("express");
const { check, validationResult } = require("express-validator");
const{ param } = require ("express-validator");
const {validarCampos} = require("../middlewares/validarCampos");

const {ObtenerMotos, obtenerMoto, obtenerMotosPorCliente, agregarMoto, actualizarMoto, eliminarMoto} = require ("../controllers/motos");

const router = Router();

router.get("/", ObtenerMotos);

router.get("/:id",[
    param("id", "Id no valido").notEmpty().isLength({min:24}),
    validarCampos
], obtenerMoto);

router.get("/motos/:cliente",[
    param("cliente", "Nombre de cliente no valido").notEmpty(),
    validarCampos
], obtenerMotosPorCliente );

router.post("/",[
    check("marca", "No puede ir vacio").notEmpty(),
    check("modelo", "No puede ir vacio").notEmpty(),
    check("cilindrada", "No puede ir vacio").notEmpty(),
    check("placa", "No puede ir vacio").notEmpty(),
    check("color", "No puede ir vacio").notEmpty(),
    check("tipo", "No puede ir vacio").notEmpty(),
    check("cliente", "Cliente no valido").notEmpty(),
    validarCampos
], agregarMoto);

router.put("/:id",[
    param("id", "Id no valido").notEmpty().isLength({min:24}),
    check("marca", "No puede ir vacio").notEmpty(),
    check("modelo", "No puede ir vacio").notEmpty(),
    check("cilindrada", "No puede ir vacio").notEmpty(),
    check("placa", "No puede ir vacio").notEmpty(),
    check("color", "No puede ir vacio").notEmpty(),
    check("tipo", "No puede ir vacio").notEmpty(),
    validarCampos
], actualizarMoto);

router.delete("/:id",[
    param("id", "Id no valido").notEmpty().isLength({min:24}),
    validarCampos
], eliminarMoto);

module.exports = router;
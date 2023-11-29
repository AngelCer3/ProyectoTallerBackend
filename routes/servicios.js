const { Router } = require ("express");
const { obtenerServicios,obtenerServicio, 
    obtenerServiciosPorMoto, agregarServicio, agregarServicioClienteMoto, 
    agregarServicioCompleto, agregarServicioCliente, actualizarServicio, eliminarServicio, proximoServicios} = require ("../controllers/servicios");

const { check, validationResult } = require("express-validator");
const{ param } = require ("express-validator");
const {validarCampos} = require("../middlewares/validarCampos");

const router = Router();

router.get("/", obtenerServicios);

router.get("/moto/:moto",[
    param("moto", "Moto no valido").notEmpty(),
    validarCampos
], obtenerServiciosPorMoto);

router.get("/proximos", proximoServicios);

router.get("/:id",[
    param("id", "Id no valido").notEmpty().isLength({min:24}),
    validarCampos
], obtenerServicio);

router.post("/",[
    check("fecha", "Fecha no valida").notEmpty().isDate(),
    check("anticipo", "No puede ir vacio").notEmpty(),
    check("kilometraje", "No puede ir vacio").notEmpty(),
    check("combustible", "No puede ir vacio").notEmpty(),
    check("concepto", "No puede ir vacio").notEmpty(),
    check("presupuesto", "No puede ir vacio").notEmpty(),
    check("observaciones", "No puede ir vacios").notEmpty(),
    check("proximo", "No puede ir vacio").notEmpty(),
    check("moto", "El campo no puede ir vacio").isMongoId(),
    validarCampos

], agregarServicio);

router.post("/completo",[
    check("nombres", "No puede ir vacio").notEmpty(),
    check("apellidos", "No puede ir vacio").notEmpty(),
    check("telefono", "No es un telefono vacio").notEmpty().isLength({min: 10, max: 14}),
    check("email", "No es un email valido").isEmail(),
    check("whatsapp", "No puede ir vacio").notEmpty().isLength({min: 10, max:14}),
    check("marca", "No puede ir vacio").notEmpty(),
    check("modelo", "No puede ir vacio").notEmpty(),
    check("cilindrada", "No puede ir vacio").notEmpty(),
    check("placa", "No puede ir vacio").notEmpty(),
    check("color", "No puede ir vacio").notEmpty(),
    check("tipo", "No puede ir vacio").notEmpty(),
    check("fecha", "Fecha no valida").notEmpty(),
    check("anticipo", "No puede ir vacio").notEmpty(),
    check("kilometraje", "No puede ir vacio").notEmpty(),
    check("combustible", "No puede ir vacio").notEmpty(),
    check("concepto", "No puede ir vacio").notEmpty(),
    check("presupuesto", "No puede ir vacio").notEmpty(),
    check("observaciones", "No puede ir vacios").notEmpty(),
    check("proximo", "No puede ir vacio").notEmpty(),
    validarCampos
], agregarServicioCompleto);

router.post("/cliente",[
    check("marca", "No puede ir vacio").notEmpty(),
    check("modelo", "No puede ir vacio").notEmpty(),
    check("cilindrada", "No puede ir vacio").notEmpty(),
    check("placa", "No puede ir vacio").notEmpty(),
    check("color", "No puede ir vacio").notEmpty(),
    check("tipo", "No puede ir vacio").notEmpty(),
    check("cliente", "Cliente no valido").isMongoId(),
    check("fecha", "Fecha no valida").notEmpty(),
    check("anticipo", "No puede ir vacio").notEmpty(),
    check("kilometraje", "No puede ir vacio").notEmpty(),
    check("combustible", "No puede ir vacio").notEmpty(),
    check("concepto", "No puede ir vacio").notEmpty(),
    check("presupuesto", "No puede ir vacio").notEmpty(),
    check("observaciones", "No puede ir vacios").notEmpty(),
    check("proximo", "No puede ir vacio").notEmpty(),
    validarCampos
], agregarServicioCliente);

router.post("/clientemoto",[
    check("fecha", "Fecha no valida").notEmpty(),
    check("anticipo", "No puede ir vacio").notEmpty(),
    check("kilometraje", "No puede ir vacio").notEmpty(),
    check("combustible", "No puede ir vacio").notEmpty(),
    check("concepto", "No puede ir vacio").notEmpty(),
    check("presupuesto", "No puede ir vacio").notEmpty(),
    check("observaciones", "No puede ir vacios").notEmpty(),
    check("proximo", "No puede ir vacio").notEmpty(),
    check("moto", "El campo no puede ir vacio").isMongoId(),
    validarCampos
], agregarServicioClienteMoto);

router.put("/:id",[
    param("id", "id no valido").notEmpty().isLength({min: 24}),
    check("fecha", "Fecha no valida").notEmpty(),
    check("anticipo", "No puede ir vacio").notEmpty(),
    check("kilometraje", "No puede ir vacio").notEmpty(),
    check("combustible", "No puede ir vacio").notEmpty(),
    check("concepto", "No puede ir vacio").notEmpty(),
    check("presupuesto", "No puede ir vacio").notEmpty(),
    check("observaciones", "No puede ir vacios").notEmpty(),
    check("proximo", "No puede ir vacio").notEmpty(),
    validarCampos
], actualizarServicio);

router.delete("/:id",[
    param("id", "id no valido").notEmpty().isLength({min: 24}),
    validarCampos
], eliminarServicio);

module.exports = router;
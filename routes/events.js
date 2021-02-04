/**
 * Rutas de Events / events
 * host + api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');


const router = Router();

// validar token
router.use(validarJWT);

// Obtener Eventos
router.get(
    '/',

    getEventos);


// Crear nuevo evento 
router.post('/', [
    check('title', 'El titulo es Obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio  es obligatoria').custom(isDate),
    check('end', 'La fecha de fin  es obligatoria').custom(isDate),
    validarCampos
], crearEvento);

// Actualizar evento    
router.put(
    '/:id',
    [
        check('title', 'El titulo es Obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio  es obligatoria').custom(isDate),
        check('end', 'La fecha de fin  es obligatoria').custom(isDate),
        validarCampos
    ], actualizarEvento);

// Eliminar  evento
router.delete('/:id', eliminarEvento);

module.exports = router; 
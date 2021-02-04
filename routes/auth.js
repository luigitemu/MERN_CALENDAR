/**
 * Rutas de Usuario / Auth
 * host + api/auth
 */
const { Router } = require('express');

const { check } = require('express-validator');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new',
    [ // middlewares
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'No es un email valido').isEmail(),
        check('password', 'La contraseña debe ser de al menos 6 caracteres ').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [
        check('email', 'El Email es obligarotio').not().isEmpty(),
        check('password', 'La contraseñaes obligatoria ').not().isEmpty(),
        validarCampos
    ],
    loginUsuario);


router.get(
    '/renew',
    [
        validarJWT
    ], revalidarToken);


module.exports = router;

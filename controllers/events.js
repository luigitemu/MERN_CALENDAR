
const { response } = require('express');

const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        eventos
    });

}
const crearEvento = async (req, res = response) => {
    // verificar que tenga el evento.

    const evento = new Evento(req.body);
    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        });


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al intentar almacenar el evento en la BD'
        });
    }


}
const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;

    try {


        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'

            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienee privilegio de editar este elemento'

            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findOneAndUpdate(eventoId, nuevoEvento, { new: true });


        res.json({
            ok: true,
            evento: eventoActualizado
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en la request'
        });
    }



}
const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay ningun evento con ese id'
            });

        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este elemento'

            });
        }

        await Evento.findOneAndDelete(eventoId);

        res.json({
            ok: true
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }




}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
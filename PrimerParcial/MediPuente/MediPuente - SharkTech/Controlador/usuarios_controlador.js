const bcrypt = require('bcryptjs');
//necesitamos al modelo
const usuarioModel = require('../Modelo/usuario');

const {validarCorreo, validarBoleta, validarContraseña} = require('../validaciones')

//que pasa si el correo y la boleta se duplica
function esDuplicado(error){
return error.code === 'ER_DUP_ENTRY' || error.code === '23595';
}

async function listaUsuarios(req, res) {
    try{
        const usuario = await usuarioModel.listar();
        res.json(usuarios);
    }catch(error){
        res.status(500).json({error: error.message})
    }
    
}

async function obtenerUauario(req, res) {
    try{
        const usuario = await usuarioModel.obtenerPorId(req.params.id);
        if(!usuario) return res.status(404).json({error: 'Usuaio no encontrado'});
        res.json(usuario);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
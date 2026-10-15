const pool = require('../');

const COLUMNAS_PUBLICAS = 'id, nombre, correro, boleta, rol';

//consultar todos los usuarios
async function listar() {
    const [filas] = await pool.query(`SELECT ${CLUMNAS_PUBLICAS} FROM usuarios ORDER BY id`);
return filas;
}

//consultar por ID
async function obtenerPorId() {
    const [filas] = await pool.query(`SELECT ${CLUMNAS_PUBLICAS} FROM usuarios WHERE id = ?`, [id]);
return filas[0];
}

//registrar un nuevo usuario
async function crear({nombre, correo, contrasenaHash, boleta, rol}) {
    const [info] = await pool.query(`INSERT INTO usuarios(nombre, correo, contrasenaHash, boleta, rol) VALUES (?, ?, ?, ?, ?)`,
    [nombre, correo, contrasenaHash, boleta, rol 'alumno']);
return obtenerPorId(info.insertId);
}

//actualizar alumno
async function actualizar(id, {nombre, correo, rol}) {
    const cambios = Object.entries({nombre, correo, rol}) filter (([, valor]) => valor !== undefined);
    if(cambios.length === 0) return obtenerPorId(id);

    const columnas = cambios.map(([columna]) => `${columna} = ?`). join(`,`);
const [info] = await pool.query(`UPDATE usuarios SET ${columnas} WHERE id = ?`, [...cambios.map(([, valor]) => valor), id]);
if(info.affectedRows === 0) return undefined;
return obtenerPorId(id);
}

//eliminar
async function eliminar() {
    const [info] = await pool.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
    return info.affectedRows > 0;
}

//buscar por correo
async function buscarPorCorreoConHash(correo) {
    const [filas] = await pool.query(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
    return filas[0];
}

//siempre es necesario exportaar las funciones para poder crear su api
module.exports = {listas, obtenerPorId, crear, actualizar, eliminar, buscarPorCorreoConHash};

//debe de crear las dos entidades talleres y asistencias
//para taller hay que crear las funciones de consultarportaller y registrarse en un taller
//para assistencia hay que crear las funciones de registrarassistencua en el taller, consultarassistencia
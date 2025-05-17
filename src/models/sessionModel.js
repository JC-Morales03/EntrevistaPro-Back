import pool from "../config/db.js";

// Obtener todas las sessiones
export const getAllSessionService = async () => {
    const result = await pool.query("SELECT * FROM t_session");
    return result.rows;
};

// Obtener una sesión por ID
export const getSessionByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM t_session WHERE id = $1", [id]);
    return result.rows[0];
};
export const getSessionByUserIdService = async (id) => {
    const result = await pool.query(`
     SELECT 
            t_session.id, 
            CONCAT(t_users.nombres, ' ', t_users.apellidos) AS trabajador,
            t_session.fecha, 
            t_session.hora_inicio, 
            t_session.hora_fin,
            t_session.estado, 
            t_session.evaluacion, 
            t_session.creado_en, 
            t_session.enlace
        FROM t_session 
        LEFT join t_users ON t_session.profesional_id = t_users.id 
        WHERE t_session.usuario_id = $1
        AND t_session.fecha IS NOT NULL  -- Aseguramos que la fecha no sea nula
        AND t_session.estado IS NOT NULL
`, [id]);

    return result.rows[0];
};

// Crear una nueva sesión
export const createSessionService = async (usuario_id, profesional_id, fecha, hora_inicio, hora_fin, estado, evaluacion, enlace) => {
    const result = await pool.query(
        `INSERT INTO t_session (usuario_id, profesional_id, fecha, hora_inicio, hora_fin, estado, evaluacion, enlace)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [usuario_id, profesional_id, fecha, hora_inicio, hora_fin, estado, evaluacion, enlace]
    );
    return result.rows[0];
};

// Actualizar una sesión existente
export const updateSessionService = async (usuario_id, profesional_id, fecha, hora_inicio, hora_fin, estado, evaluacion, enlace, id) => {
    const result = await pool.query(
        `UPDATE t_session 
         SET usuario_id = $1, profesional_id = $2, fecha = $3, hora_inicio = $4, hora_fin = $5,
             estado = $6, evaluacion = $7, enlace = $8
         WHERE id = $9
         RETURNING *`,
        [usuario_id, profesional_id, fecha, hora_inicio, hora_fin, estado, evaluacion, enlace, id]
    );
    return result.rows[0];
};

// Eliminar una sesión
export const deleteSessionService = async (id) => {
    const result = await pool.query("DELETE FROM t_session WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

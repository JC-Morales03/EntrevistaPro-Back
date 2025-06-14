import pool from "../config/db.js";

export const getAllCourseService = async (userId) => {
  try {
    const query = `
            SELECT c.id_course, c.nombre, c.descripcion, c.categoria, c.fecha_inicio, 
                   c.profesional, c.duracion, c.precio, c.imagen
            FROM t_course c
            WHERE c.categoria = ANY (
                SELECT unnest(habilidades)
                FROM t_users t
                WHERE id = $1
            )
        `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error("Error en getAllCourseService:", error);
    throw new Error("No se pudieron obtener los cursos");
  }
};

export const getAllCourseServiceAll = async () => {
  const result = await pool.query(
    "SELECT id_course, nombre, descripcion, categoria, fecha_inicio, profesional, duracion, horario, precio FROM t_course"
  );
  return result.rows;
};

export const getCourseByIdService = async (id) => {
  const result = await pool.query(
    "SELECT * FROM t_course where id_course = $1",
    [id]
  );
  return result.rows[0];
};
export const getCourseRegisteredService = async (id) => {
  const result = await pool.query(
    "SELECT nombre, categoria, profesional, duracion, horario, fecha_inicio, url FROM t_course tc INNER JOIN t_coursePayed tcp ON tc.id_course = tcp.id_course  where id_user = $1",
    [id]
  );
  return result.rows;
};

// Crear curso
export const createCourseService = async (
  nombre,
  descripcion,
  descripcion2,
  profesional,
  duracion,
  horario,
  fecha_inicio,
  precio,
  categoria,
  etapas,
  imagen,
  url
) => {
  const result = await pool.query(
    `INSERT INTO t_course (
            nombre, descripcion, descripcion2, profesional,
            duracion, horario, fecha_inicio, precio,
            categoria, etapas, imagen, url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *`,
    [
      nombre,
      descripcion,
      descripcion2,
      profesional,
      duracion,
      horario,
      fecha_inicio,
      precio,
      categoria,
      etapas,
      imagen,
      url,
    ]
  );
  return result.rows[0];
};

// Actualizar curso
export const updateCourseService = async (
  id_course,
  nombre,
  descripcion,
  descripcion2,
  profesional,
  duracion,
  horario,
  fecha_inicio,
  precio,
  categoria,
  etapas,
  imagen,
  url
) => {
  const result = await pool.query(
    `UPDATE t_course SET
            nombre = $1,
            descripcion = $2,
            descripcion2 = $3,
            profesional = $4,
            duracion = $5,
            horario = $6,
            fecha_inicio = $7,
            precio = $8,
            categoria = $9,
            etapas = $10,
            imagen = $11,
            url = $12
         WHERE id_course = $13
         RETURNING *`,
    [
      nombre,
      descripcion,
      descripcion2,
      profesional,
      duracion,
      horario,
      fecha_inicio,
      precio,
      categoria,
      etapas,
      imagen,
      url,
      id_course,
    ]
  );
  return result.rows[0];
};

// Eliminar curso
export const deleteCourseService = async (id_course) => {
  const result = await pool.query(
    "DELETE FROM t_course WHERE id_course = $1 RETURNING *",
    [id_course]
  );
  return result.rows[0];
};

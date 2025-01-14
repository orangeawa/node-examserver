import pool from "../config/db";

export const getAllExamRoom = async () => {
  const [rows] = await pool.query(`SELECT * FROM exam_room_seat`);
  return rows;
};

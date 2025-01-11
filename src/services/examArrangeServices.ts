import pool from "../config/db";

export const getAllExamArrange = async () => {
  const [rows] = await pool.query(`
        select
            cl.name as "className",
            count(rs.student_id) as "studentCount",
            el.name as "examName",
            el.time as "examTime",
            el.duration as "examDuration",
            erl.name as "examRoomName"
        from
            exam_room_seat rs
                join student_list sl on rs.student_id = sl.sid
                join class_list cl on sl.class_name = cl.name
                join exam_list el on rs.exam_id = el.id
                join ryexam.exam_room_list erl on rs.exam_room_id = erl.id
        group by cl.name;
    `);
  return rows;
};

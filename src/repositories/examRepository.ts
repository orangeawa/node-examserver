import pool from '../config/db';
import { Exam } from '../types/exam';

export class ExamRepository {
  async findAll(pageNum: number, pageSize: number, filters?: Partial<Exam>) {
    let sql = 'SELECT * FROM Exam WHERE 1=1';
    const params: any[] = [];

    if (filters?.course_name) {
      sql += ' AND course_name LIKE ?';
      params.push(`%${filters.course_name}%`);
    }
    if (filters?.exam_time) {
      sql += ' AND exam_time = ?';
      params.push(filters.exam_time);
    }
    if (filters?.duration) {
      sql += ' AND duration = ?';
      params.push(filters.duration);
    }

    sql += ' ORDER BY exam_time ASC LIMIT ? OFFSET ?';
    params.push(pageSize, (pageNum - 1) * pageSize);

    const [rows] = await pool.query(sql, params);
    const [total] = await pool.query('SELECT COUNT(*) as total FROM Exam');

    return {
      rows,
      total: (total as any)[0].total
    };
  }

  async create(exam: Omit<Exam, 'id'>) {
    const [result] = await pool.query(
      'INSERT INTO Exam (course_name, exam_time, duration, description) VALUES (?, ?, ?, ?)',
      [exam.course_name, exam.exam_time, exam.duration, exam.description]
    );
    return result;
  }

  async update(id: number, exam: Partial<Exam>) {
    const [result] = await pool.query(
      'UPDATE Exam SET course_name = ?, exam_time = ?, duration = ?, description = ? WHERE id = ?',
      [exam.course_name, exam.exam_time, exam.duration, exam.description, id]
    );
    return result;
  }

  async delete(id: number) {
    const [result] = await pool.query('DELETE FROM Exam WHERE id = ?', [id]);
    return result;
  }
} 
import pool from '../config/db';
import { Student } from '../types/student';

export class StudentRepository {
  async findAll(pageNum: number, pageSize: number, filters?: Partial<Student>) {
    let sql = 'SELECT * FROM Student WHERE 1=1';
    const params: any[] = [];

    if (filters?.student_id) {
      sql += ' AND student_id LIKE ?';
      params.push(`%${filters.student_id}%`);
    }
    if (filters?.student_name) {
      sql += ' AND student_name LIKE ?';
      params.push(`%${filters.student_name}%`);
    }
    if (filters?.class_id) {
      sql += ' AND class_id = ?';
      params.push(filters.class_id);
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(pageSize, (pageNum - 1) * pageSize);

    const [rows] = await pool.query(sql, params);
    const [total] = await pool.query('SELECT COUNT(*) as total FROM Student');

    return {
      rows,
      total: (total as any)[0].total
    };
  }

  async create(student: Omit<Student, 'id'>) {
    const [result] = await pool.query(
      'INSERT INTO Student (student_id, student_name, class_id) VALUES (?, ?, ?)',
      [student.student_id, student.student_name, student.class_id]
    );
    return result;
  }

  async update(id: number, student: Partial<Student>) {
    const [result] = await pool.query(
      'UPDATE Student SET student_id = ?, student_name = ?, class_id = ? WHERE id = ?',
      [student.student_id, student.student_name, student.class_id, id]
    );
    return result;
  }

  async delete(id: number) {
    const [result] = await pool.query('DELETE FROM Student WHERE id = ?', [id]);
    return result;
  }
} 
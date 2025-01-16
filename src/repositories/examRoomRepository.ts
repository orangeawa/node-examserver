import pool from '../config/db';
import { ExamRoom } from '../types/examRoom';

export class ExamRoomRepository {
  /**
   * 获取考场列表
   */
  async findAll(pageNum: number, pageSize: number, filters?: Partial<ExamRoom>) {
    let sql = 'SELECT * FROM ExamRoom WHERE 1=1';
    const params: any[] = [];

    if (filters?.room_name) {
      sql += ' AND room_name LIKE ?';
      params.push(`%${filters.room_name}%`);
    }
    if (filters?.capacity) {
      sql += ' AND capacity = ?';
      params.push(filters.capacity);
    }

    sql += ' ORDER BY room_name ASC LIMIT ? OFFSET ?';
    params.push(pageSize, (pageNum - 1) * pageSize);

    const [rows] = await pool.query(sql, params);
    const [total] = await pool.query('SELECT COUNT(*) as total FROM ExamRoom');

    return {
      rows,
      total: (total as any)[0].total
    };
  }

  /**
   * 新增考场
   */
  async create(examRoom: Omit<ExamRoom, 'id'>) {
    const [result] = await pool.query(
      'INSERT INTO ExamRoom (room_name, capacity) VALUES (?, ?)',
      [examRoom.room_name, examRoom.capacity]
    );
    return result;
  }

  /**
   * 更新考场
   */
  async update(id: number, examRoom: Partial<ExamRoom>) {
    const [result] = await pool.query(
      'UPDATE ExamRoom SET room_name = ?, capacity = ? WHERE id = ?',
      [examRoom.room_name, examRoom.capacity, id]
    );
    return result;
  }

  /**
   * 删除考场
   */
  async delete(id: number) {
    const [result] = await pool.query('DELETE FROM ExamRoom WHERE id = ?', [id]);
    return result;
  }
} 
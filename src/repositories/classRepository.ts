import pool from '../config/db';
// import { Class } from '../types/class';

export class ClassRepository {
  /**
   * 获取班级列表
   * @param pageNum 
   * @param pageSize 
   * @param class_code 
   * @returns 
   */
  async findAll(pageNum: number, pageSize: number, class_code?: string) {
    let sql = 'SELECT * FROM Class WHERE 1=1';
    const params: any[] = [];

    if (class_code) {
      sql += ' AND class_code LIKE ?';
      params.push(`%${class_code}%`);
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(pageSize, (pageNum - 1) * pageSize);

    const [rows] = await pool.query(sql, params);
    const [total] = await pool.query('SELECT COUNT(*) as total FROM Class');

    return {
      rows,
      total: (total as any)[0].total
    };
  }

  /**
   * 新增班级
   * @param class_code 
   * @returns 
   */
  async create(class_code: string) {
    const [result] = await pool.query(
      'INSERT INTO Class (class_code, total_students) VALUES (?, 0)',
      [class_code]
    );
    return result;
  }

  /**
   * 更新班级
   * @param id 
   * @param class_code 
   * @returns 
   */
  async update(id: number, class_code: string) {
    const [result] = await pool.query(
      'UPDATE Class SET class_code = ? WHERE id = ?',
      [class_code, id]
    );
    return result;
  }

  /**
   * 删除班级
   * @param id 
   * @returns 
   */
  async delete(id: number) {
    const [result] = await pool.query('DELETE FROM Class WHERE id = ?', [id]);
    return result;
  }

  /**
   * 通过学生表更新班级表人数信息
   * @returns 
   */
  async updateClassStudentCount(id: number) {
    const [result] = await pool.query('UPDATE Class SET total_students = (SELECT COUNT(*) FROM Student WHERE class_id = ?) WHERE id = ?', [id, id]);
    return result;
  }
}

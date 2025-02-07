import pool from '../config/db';
import { BatchCreateScheduleByExamAndClass, ExamSchedule } from '../types/examSchedule';

export class ExamScheduleRepository {
  /**
   * 获取考试安排列表
   */
  async findAll(pageNum: number, pageSize: number, filters?: Partial<ExamSchedule>) {
    let sql = `
      SELECT es.*, e.course_name, c.class_code, er.room_name, s.student_name 
      FROM ExamSchedule es
      LEFT JOIN Exam e ON es.exam_id = e.id
      LEFT JOIN Class c ON es.class_id = c.id
      LEFT JOIN ExamRoom er ON es.room_id = er.id
      LEFT JOIN Student s ON es.student_id = s.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters?.exam_id) {
      sql += ' AND es.exam_id = ?';
      params.push(filters.exam_id);
    }
    if (filters?.class_id) {
      sql += ' AND es.class_id = ?';
      params.push(filters.class_id);
    }
    if (filters?.room_id) {
      sql += ' AND es.room_id = ?';
      params.push(filters.room_id);
    }
    if (filters?.student_id) {
      sql += ' AND es.student_id = ?';
      params.push(filters.student_id);
    }

    sql += ' ORDER BY es.exam_id, es.room_id, es.seat_number LIMIT ? OFFSET ?';
    params.push(pageSize, (pageNum - 1) * pageSize);

    const [rows] = await pool.query(sql, params);
    const [total] = await pool.query('SELECT COUNT(*) as total FROM ExamSchedule');

    return {
      rows,
      total: (total as any)[0].total
    };
  }

  /**
   * 新增考试安排
   */
  async create(schedule: Omit<ExamSchedule, 'id'>) {
    const [result] = await pool.query(
      'INSERT INTO ExamSchedule (exam_id, class_id, room_id, seat_number, student_id) VALUES (?, ?, ?, ?, ?)',
      [schedule.exam_id, schedule.class_id, schedule.room_id, schedule.seat_number, schedule.student_id]
    );
    return result;
  }

  /**
   * 批量创建考试安排
   * @param schedules 考试安排数据
   */
  async batchCreate(schedules: Omit<ExamSchedule, 'id'>[]) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // 将数据分批处理,每批1000条
      const batchSize = 1000;
      for (let i = 0; i < schedules.length; i += batchSize) {
        const batch = schedules.slice(i, i + batchSize);
        
        // 构建批量插入SQL
        const values = batch.map(schedule => 
          `(${schedule.exam_id}, ${schedule.class_id}, ${schedule.room_id}, ${schedule.seat_number}, ${schedule.student_id})`
        ).join(',');
        
        await connection.query(
          `INSERT INTO ExamSchedule (exam_id, class_id, room_id, seat_number, student_id) VALUES ${values}`
        );
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * 更新考试安排
   */
  async update(id: number, schedule: Partial<ExamSchedule>) {
    const [result] = await pool.query(
      'UPDATE ExamSchedule SET exam_id = ?, class_id = ?, room_id = ?, seat_number = ?, student_id = ? WHERE id = ?',
      [schedule.exam_id, schedule.class_id, schedule.room_id, schedule.seat_number, schedule.student_id, id]
    );
    return result;
  }

  /**
   * 删除考试安排
   */
  async delete(id: number) {
    const [result] = await pool.query('DELETE FROM ExamSchedule WHERE id = ?', [id]);
    return result;
  }

  /**
   * 检查考场容量
   * @param room_id 考场ID
   * @param exam_id 考试ID
   * @returns 是否容量充足(true: 容量充足, false: 容量不足)
   */
  async checkRoomCapacity(room_id: number, exam_id: number): Promise<boolean> {
    const [rows] = await pool.query(
      'SELECT er.capacity, COUNT(es.id) as current_count FROM ExamRoom er LEFT JOIN ExamSchedule es ON er.id = es.room_id AND es.exam_id = ? WHERE er.id = ? GROUP BY er.id',
      [exam_id, room_id]
    );
    const result = rows as any[];
    if (result.length === 0) return false;
    return result[0].current_count < result[0].capacity;
  }

  /**
   * 获取考场已占用的座位号
   * @param room_id 考场ID
   * @param exam_id 考试ID
   * @returns 已占用的座位号数组
   */
  async getOccupiedSeats(room_id: number, exam_id: number): Promise<number[]> {
    const [rows] = await pool.query(
      'SELECT seat_number FROM ExamSchedule WHERE room_id = ? AND exam_id = ?',
      [room_id, exam_id]
    );
    return (rows as any[]).map(row => row.seat_number);
  }

  /**
   * 获取班级学生列表
   * @param class_id 班级ID
   * @returns 学生列表
   */
  async getStudentsByClassId(class_id: number): Promise<any[]> {
    const [students] = await pool.query('SELECT id FROM Student WHERE class_id = ?', [class_id]);
    return students as any[];
  }
  
  /**
   * 获取多个班级的学生列表
   * @param class_ids 班级ID数组
   */
  async getStudentsByClassIds(class_ids: number[]): Promise<{id: number, student_id: string, student_name: string, class_id: number}[]> {
    const [students] = await pool.query(
      'SELECT id, student_id, student_name, class_id FROM Student WHERE class_id IN (?)', 
      [class_ids]
    );
    return students as any[];
  }

  /**
   * 获取考试信息
   * @param exam_id 考试ID
   * @returns 考试信息
   */
  async getExamById(exam_id: number): Promise<any> {
    const [rows] = await pool.query('SELECT * FROM Exam WHERE id = ?', [exam_id]);
    return rows as any[];
  }

  /**
   * 列出考场在当前考试时间段的所有座位信息
   */
  async getAvailableRooms(exam_id: number): Promise<{id: number, name: string, remaining_seats: number, assigned_seats: number, total_seats: number}[]> {
    const [rows] = await pool.query(
      `SELECT
          er.id as id,
          er.room_name as name,
          er.capacity - IFNULL(schedule.assigned_count, 0) AS remaining_seats,
          IFNULL(schedule.assigned_count, 0) AS assigned_seats,
          er.capacity as total_seats

      FROM examroom er
      LEFT JOIN (
          SELECT
              es.room_id,
              COUNT(*) AS assigned_count
          FROM examschedule es
          JOIN exam e ON es.exam_id = e.id
          WHERE (select exam_time from exam where id = ?) BETWEEN e.exam_time AND DATE_ADD(e.exam_time, INTERVAL e.duration MINUTE)
          GROUP BY es.room_id
      ) schedule ON er.id = schedule.room_id;`,
      [exam_id]
    );

    return rows as any[];

  }


  /**
   * 根据'考试ID'和'班级ID'批量创建考试安排
   */
  async batchCreateByExamAndClass(batchData: BatchCreateScheduleByExamAndClass) {

  }

  /**
   * 检查学生在指定考试时间段是否已有安排
   * @param exam_id 考试ID
   * @param student_ids 学生ID数组
   * @returns 已有安排的学生列表 [{student_id, student_name, course_name, exam_time}]
   */
  async checkStudentTimeConflict(exam_id: number, student_ids: number[]): Promise<any[]> {
    const [rows] = await pool.query(
      `SELECT DISTINCT 
        s.id as student_id,
        s.student_name,
        e2.course_name,
        e2.exam_time
      FROM ExamSchedule es
      JOIN Student s ON es.student_id = s.id
      JOIN Exam e1 ON es.exam_id = e1.id
      JOIN Exam e2 ON e2.id = ?
      WHERE s.id IN (?)
      AND e1.exam_time BETWEEN e2.exam_time 
      AND DATE_ADD(e2.exam_time, INTERVAL e2.duration MINUTE)`,
      [exam_id, student_ids]
    );
    return rows as any[];
  }

} 
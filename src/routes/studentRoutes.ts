import { Router } from 'express';
import pool from '../config/db';
import { errorResponse, successResponse } from '../utils/response';

const router: Router = Router();

// 获取所有学生
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM student_list');
    res.json(successResponse(rows, '获取学生列表成功'));
  } catch (error) {
    res.json(errorResponse('获取学生列表失败'));
  }
});

// 添加学生
router.post('/', async (req, res) => {
  const { sid, name, class_name } = req.body;
  try {
    await pool.query(
      'INSERT INTO student_list (sid, name, class_name) VALUES (?, ?, ?)',
      [sid, name, class_name]
    );
    res.json(successResponse(null, '学生添加成功'));
  } catch (error) {
    res.json(errorResponse('添加学生失败'));
  }
});

// 删除学生
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM student_list WHERE id = ?', [id]);
    res.json(successResponse(null, '学生删除成功'));
  } catch (error) {
    res.json(errorResponse('删除学生失败'));
  }
});

export default router;

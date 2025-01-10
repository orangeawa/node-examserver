import { Router } from 'express';
import pool from '../config/db';
import { errorResponse, successResponse } from '../utils/response';

const router: Router = Router();

// 获取所有考试科目
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exam_list');
    res.json(successResponse(rows));
  } catch (error) {
    res.json(errorResponse('获取考试列表失败'));
  }
});

// 添加新考试
router.post('/', async (req, res) => {
  const { name, time, duration } = req.body;
  try {
    await pool.query(
      'INSERT INTO exam_list (name, time, duration) VALUES (?, ?, ?)',
      [name, time, duration]
    );
    res.status(201).json(successResponse(null, `添加${ name }成功`));
  } catch (error) {
    res.json(errorResponse(`添加考试失败${ error }`));
  }
});

// 删除考试
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM exam_list WHERE id = ?', [id]);
    res.json(successResponse(null, '删除考试成功'));
  } catch (error) {
    res.json(errorResponse('删除考试失败'));
  }
});

export default router;

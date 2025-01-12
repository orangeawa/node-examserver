import { Router } from 'express';
import pool from '../config/db';
import { errorResponse, successResponse } from '../utils/response';

const router: Router = Router();

// 获取所有考场
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exam_room_list');
    res.json(successResponse(rows, '获取考场列表成功'));
  } catch (error) {
    res.json(errorResponse('获取考场列表失败'));
  }
});

// 添加考场
router.post('/', async (req, res) => {
  const { name, capacity } = req.body;
  try {
    await pool.query(
      'INSERT INTO exam_room_list (name, capacity) VALUES (?, ?)',
      [name, capacity]
    );
    res.json(successResponse(null, '考场添加成功'));
  } catch (error) {
    res.json(errorResponse('添加考场失败'));
  }
});

export default router;

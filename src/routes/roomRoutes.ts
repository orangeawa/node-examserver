import { Router } from 'express';
import pool from '../config/db';

const router: Router = Router();

// 获取所有考场
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exam_room_list');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: '获取考场列表失败', error });
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
    res.status(201).json({ message: '考场添加成功' });
  } catch (error) {
    res.status(500).json({ message: '添加考场失败', error });
  }
});

export default router;

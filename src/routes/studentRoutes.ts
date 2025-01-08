import { Router } from 'express';
import pool from '../config/db';

const router: Router = Router();

// 获取所有学生
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM student_list');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: '获取学生列表失败', error });
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
    res.status(201).json({ message: '学生添加成功' });
  } catch (error) {
    res.status(500).json({ message: '添加学生失败', error });
  }
});

export default router;

import { Router } from 'express';
import pool from '../config/db';

const router: Router = Router();

// 获取所有班级
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM class_list');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: '获取班级列表失败', error });
  }
});

// 添加班级
router.post('/', async (req, res) => {
  const { name, number } = req.body;
  try {
    await pool.query(
      'INSERT INTO class_list (name, number) VALUES (?, ?)',
      [name, number]
    );
    res.status(201).json({ message: '班级添加成功' });
  } catch (error) {
    res.status(500).json({ message: '添加班级失败', error });
  }
});

export default router;

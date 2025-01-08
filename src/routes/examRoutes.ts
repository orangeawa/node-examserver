import { Router } from 'express';
import pool from '../config/db';

const router: Router = Router();

// 获取所有考试科目
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM exam_list');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: '获取考试列表失败', error });
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
    res.status(201).json({ message: '考试添加成功' });
  } catch (error) {
    res.status(500).json({ message: '添加考试失败', error });
  }
});

// 删除考试
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM exam_list WHERE id = ?', [id]);
    res.json({ message: '考试删除成功' });
  } catch (error) {
    res.status(500).json({ message: '删除考试失败', error });
  }
});

export default router;

import { Router } from 'express';
import pool from '../config/db';
import { errorResponse, successResponse } from '../utils/response';

const router: Router = Router();

// 获取所有班级
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM class_list');
    res.json(successResponse(rows, '获取班级列表成功'));
  } catch (error) {
    res.json(errorResponse('获取班级列表失败'));
  }
});

// 添加班级
router.post('/', async (req, res) => {
  const { name, number } = req.body;

  if(name == ''){
    res.json(errorResponse('班级名称不能为空'));
    return;
  }

  try {
    await pool.query(
      'INSERT INTO class_list (name, number) VALUES (?, ?)',
      [name, number]
    );
    res.json(successResponse(null, '班级添加成功'));
  } catch (error) {
    res.json(errorResponse("失败" + error));
  }
});

// 删除班级
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query('DELETE FROM class_list WHERE id = ?', [id]);
    res.json(successResponse(null, '班级删除成功'));
  } catch (error) {
    res.json(errorResponse('删除失败' + error));
  }
});

export default router;

# API 文档

## 通用返回格式
所有 API 返回数据均遵循以下结构：

```json
{
  "code": number,        // 状态码（如 200 表示成功，400 表示请求错误）
  "message": string,     // 响应描述
  "data": object | null  // 返回数据（如果有）
}
```

## 状态码
- 200：成功
- 201：成功，但不提示信息
- 400：请求错误
<!-- - 401：未授权
- 404：未找到
- 500：服务器错误 -->

---

# 接口定义

## 班级

### 1. 新增班级
**POST** `/api/classes`

**请求体：**
```json
{
  "class_code": "string",      // 班级代码（必填，最大长度：10）
}
```

**返回：**
```json
{
  "code": 200,
  "message": "新增班级**成功",
  "data": null
}
```

### 2. 获取班级
**GET** `/api/classes`

**请求参数：**
- `pageNum`：页码（必填，默认：1）
- `pageSize`：每页数量（必填，默认：10）
- `class_code`：班级代码（非必填，最大长度：10）
- `total_students`：班级学生总数（非必填）

**返回：**
- **成功 (201)：**
```json
{
  "code": 201,
  "message": "success",
  "data": [
    {
      "id": 1,
      "class_code": "04F2111",
      "total_students": 36
    }
  ],
  "total": 10 // 总条数
}
```

### 3. 更新班级
**PUT** `/api/classes/:id`

**请求体：**
```json
{
  "class_code": "string",      // 班级代码（必填，最大长度：10）
}
``` 

**返回：**
```json
{
  "code": 200,
  "message": "班级**信息更新成功",
  "data": null
}
```

### 4. 刷新班级学生总数
**POST** `/api/classes/refresh`

**请求体：**
```json
{
  "class_code": "string",      // 班级代码（若为空，则刷新所有班级）
}
```

**返回：**
```json
{
  "code": 200,
  "message": "学生数刷新成功",
  "data": null
}
```

### 5. 删除班级
**DELETE** `/api/classes/:id`

**路径参数：**
- `id`：要删除的班级 ID。

**返回：**
```json
{
  "code": 200,
  "message": "班级**删除成功",
  "data": null
}
```


## 学生

### 1. 新增学生
**POST** `/api/students`

**请求体：**
```json
{
  "student_id": "string",      // 学生学号（必填，最大长度：10）
  "student_name": "string",    // 学生姓名（必填，最大长度：26）
  "class_id": "string",  // 学生班级（必填，最大长度：10）
}
```

**返回：**
```json
{
  "code": 200,
  "message": "新增学生**成功",
  "data": null
}
```

### 2. 获取学生
**GET** `/api/students`

**请求参数：**
- `pageNum`：页码（必填，默认：1）
- `pageSize`：每页数量（必填，默认：10）
- `student_id`：学生学号（非必填，最大长度：10）
- `student_name`：学生姓名（非必填，最大长度：26）
- `class_id`：学生班级（非必填，最大长度：10）

**返回：**
- **成功 (201)：**
```json
{
  "code": 201,
  "message": "success",
  "data": [
    {
      "id": 1,
      "student_id": "20218666",
      "student_name": "张三",
      "class_id": 1
    }
  ],
  "total": 10 // 总条数
}
```

### 3. 更新学生
**PUT** `/api/students/:id`

**请求体：**
```json
{
  "student_id": "string",      // 学生学号（必填，最大长度：10）
  "student_name": "string",    // 学生姓名（必填，最大长度：26）
  "class_id": "string",  // 学生班级（必填，最大长度：10）
}
```

**返回：**
```json
{
  "code": 200,
  "message": "学生**信息更新成功",
  "data": null
}
```

### 4. 删除学生
**DELETE** `/api/students/:id`

**路径参数：**
- `id`：要删除的学生 ID。

**返回：**
```json
{
  "code": 200,
  "message": "学生**删除成功",
  "data": null
}
```

## 考试

### 1. 新增考试
**POST** `/api/exams`

**请求体：**
```json
{
  "course_name": "string",      // 考试课程名称（必填，最大长度：26）
  "exam_time": "datetime",    // 考试时间，ISO 格式（必填）
  "duration": number,       // 考试时长，单位为分钟（必填）
  "description": "string",    // 考试描述（非必填，最大长度：255）
}
```

**返回：**
- **成功 (200)：**
```json
{
  "code": 200,
  "message": "考试创建成功",
  "data": null
}
```
- **错误 (400)：**
```json
{
  "code": 400,
  "message": "请求数据无效",
  "data": null
}
```

---

### 2. 获取考试
**GET** `/api/exams`

**请求参数：**
- `pageNum`：页码（必填，默认：1）
- `pageSize`：每页数量（必填，默认：10）
- `course_name`：考试课程名称（非必填，最大长度：26）
- `exam_time`：考试时间（非必填，ISO 格式）
- `duration`：考试时长（非必填）
- `description`：考试描述（非必填，最大长度：255）

**返回：**
- **成功 (201)：**
```json
{
  "code": 201,
  "message": "success",
  "data": [
    {
      "id": 1,
      "course_name": "数学考试",
      "exam_time": "2025-01-15T08:00:00Z",
      "duration": 120,
      "description": "统考|闭卷"
    },
    {
      "id": 2,
      "course_name": "英语考试",
      "exam_time": "2025-01-16T10:00:00Z",
      "duration": 90,
      "description": "这是一场英语考试"
    }
  ]
}
```
- **错误 (500)：**
```json
{
  "code": 500,
  "message": "获取考试失败",
  "data": null
}
```

---

### 3. 更新考试
**PUT** `/api/exams/:id`

**路径参数：**
- `id`：要更新的考试 ID。

**请求体：**
```json
{
  "course_name": "string",      // 新的考试名称（可选）
  "exam_time": "datetime",    // 新的考试时间，ISO 格式（可选）
  "duration": number,       // 新的考试时长，单位为分钟（可选）
  "description": "string",    // 新的考试描述（非必填，最大长度：255）
}
```

**返回：**
- **成功 (200)：**
```json
{
  "code": 200,
  "message": "考试更新成功",
  "data": null
}
```
- **错误 (404)：**
```json
{
  "code": 404,
  "message": "考试未找到",
  "data": null
}
```
- **错误 (400)：**
```json
{
  "code": 400,
  "message": "请求数据无效",
  "data": null
}
```

---

### 4. 删除考试
**DELETE** `/api/exams/:id`

**路径参数：**
- `id`：要删除的考试 ID。

**返回：**
- **成功 (200)：**
```json
{
  "code": 200,
  "message": "考试删除成功",
  "data": null
}
```
- **错误 (404)：**
```json
{
  "code": 404,
  "message": "考试未找到",
  "data": null
}
```

---

## 考场

### 1. 新增考场
**POST** `/api/exam_rooms`

**请求体：**
```json
{
  "room_name": "string",      // 考场名称（必填，最大长度：26）
  "capacity": number,    // 考场容量（必填）
}
```

**返回：**
```json
{
  "code": 200,
  "message": "考场**创建成功",
  "data": null
}
```

### 2. 获取考场
**GET** `/api/exam_rooms`

**请求参数：**
- `pageNum`：页码（必填，默认：1）
- `pageSize`：每页数量（必填，默认：10）
- `room_name`：考场名称（非必填，最大长度：26）
- `capacity`：考场容量（非必填）

**返回：**
- **成功 (201)：**
```json
{
  "code": 201,
  "message": "success",
  "data": [
    {
      "id": 1,
      "room_name": "考场1",
      "capacity": 100
    }
  ]
}
```

### 3. 更新考场
**PUT** `/api/exam_rooms/:id`

**路径参数：**
- `id`：要更新的考场 ID。

**请求体：**
```json
{
  "room_name": "string",      // 新的考场名称（可选，最大长度：26）
  "capacity": number          // 新的考场容量（可选）
}
```

**返回：**
- **成功 (200)：**
```json
{
  "code": 200,
  "message": "考场更新成功",
  "data": null
}
```
- **错误 (404)：**
```json
{
  "code": 404,
  "message": "考场未找到",
  "data": null
}
```
- **错误 (400)：**
```json
{
  "code": 400,
  "message": "请求数据无效",
  "data": null
}
```

### 4. 删除考场
**DELETE** `/api/exam_rooms/:id`

**路径参数：**
- `id`：要删除的考场 ID。

**返回：**
- **成功 (200)：**
```json
{
  "code": 200,
  "message": "考场删除成功",
  "data": null
}
```
- **错误 (404)：**
```json
{
  "code": 404,
  "message": "考场未找到",
  "data": null
}
```

---

## 考试安排(ExamSchedule )

### 1. 新增考试安排
**POST** `/api/exam_schedules`

**请求体：**
```json
{
  "exam_id": "number",      // 考试ID（必填）
  "class_id": "number",      // 班级ID（必填）
  "room_id": "number",      // 考场ID（必填）
  "seat_number": "number",  // 座位号（必填）
  "student_id": "number",    // 学生ID（必填）
}
```

**返回：**
```json
{
  "code": 200,
  "message": "考试安排创建成功",
  "data": null
}
```

---

### 2. 获取考试安排
**GET** `/api/exam_schedules`

**请求参数：**
- `pageNum`：页码（必填，默认：1）
- `pageSize`：每页数量（必填，默认：10）
- `exam_id`：考试ID（非必填）
- `class_id`：班级ID（非必填）
- `room_id`：考场ID（非必填）
- `student_id`：学生ID（非必填）

**返回：**
- **成功 (201)：**
```json
{
  "code": 201,
  "message": "success",
  "data": [
    {
      "id": 1,
      "exam_id": 1,
      "class_id": 1,
      "room_id": 1,
      "seat_number": 12,
      "student_id": 1
    }
  ],
  "total": 10 // 总条数
}
```

---

### 3. 更新考试安排
**PUT** `/api/exam_schedules/:id`

**请求体：**
```json
{
  "exam_id": "number",      // 考试ID（可选）
  "class_id": "number",      // 班级ID（可选）
  "room_id": "number",      // 考场ID（可选）
  "seat_number": "number",  // 座位号（可选）
  "student_id": "number",    // 学生ID（可选）
}
```

**返回：**
- **成功 (200)：**
```json
{
  "code": 200,
  "message": "考试安排更新成功",
  "data": null
}
```
- **错误 (404)：**
```json
{
  "code": 404,
  "message": "考试安排未找到",
  "data": null
}
```

---

### 4. 删除考试安排
**DELETE** `/api/exam_schedules/:id`

**路径参数：**
- `id`：要删除的考试安排 ID。

**返回：**
- **成功 (200)：**
```json
{
  "code": 200,
  "message": "考试安排删除成功",
  "data": null
}
```
- **错误 (404)：**
```json
{
  "code": 404,
  "message": "考试安排未找到",
  "data": null
}
```

---

### 5. 批量创建考试安排
**POST** `/api/exam_schedules/batch`

**请求体：**
```json
{
  "exam_id": "number",      // 考试ID（必填）
  "class_ids": "number[]",  // 班级ID数组（必填）
  "room_ids": "number[]",   // 考场ID数组（必填）
}
```

**返回：**
- **成功 (200)：**
```json
{
  "code": 200,
  "message": "批量创建考试安排成功",
  "data": null
}
```
- **错误 (400)：**
```json
{
  "code": 400,
  "message": "考场容量不足",
  "data": null
}
```

---

# 备注
- 所有时间戳均应为 ISO 8601 格式。
- 验证错误将始终返回 `400` 状态码，并附带描述性 `message`。
- （如果后续添加身份验证功能）未授权访问将返回 `401` 状态码。



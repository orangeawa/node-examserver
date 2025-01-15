drop database if exists examserver;
create database examserver;

use examserver;

-- 班级表
CREATE TABLE Class (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '系统唯一标识',
    class_code VARCHAR(10) NOT NULL UNIQUE COMMENT '班级代码（自定义）',
    total_students INT NOT NULL COMMENT '班级人数'
);

-- 学生表
CREATE TABLE Student (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '系统唯一标识',
    student_id VARCHAR(10) NOT NULL UNIQUE COMMENT '学生学号（自定义）',
    student_name VARCHAR(26) NOT NULL COMMENT '学生姓名',
    class_id INT NOT NULL COMMENT '班级ID（与Class表关联）',
    FOREIGN KEY (class_id) REFERENCES Class(id) ON DELETE CASCADE
);

-- 考试表
CREATE TABLE Exam (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '系统唯一标识',
    course_name VARCHAR(26) NOT NULL COMMENT '考试课程名',
    exam_time DATETIME NOT NULL COMMENT '考试时间',
    duration INT NOT NULL COMMENT '考试时长（分钟）',
    description TEXT COMMENT '考试描述'
);

-- 考场表
CREATE TABLE ExamRoom (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '系统唯一标识',
    room_name VARCHAR(26) NOT NULL UNIQUE COMMENT '考场名',
    capacity INT NOT NULL COMMENT '考场容纳人数'
);

-- 考试安排表
CREATE TABLE ExamSchedule (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '系统唯一标识',
    exam_id INT NOT NULL COMMENT '考试ID',
    class_id INT NOT NULL COMMENT '班级ID',
    room_id INT NOT NULL COMMENT '考场ID',
    seat_number INT NOT NULL COMMENT '座位号（每位学生分配一个座位号）',
    student_id INT NOT NULL COMMENT '学生系统唯一标识',
    FOREIGN KEY (exam_id) REFERENCES Exam(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES Class(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES ExamRoom(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE CASCADE
);

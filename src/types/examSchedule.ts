export interface ExamSchedule {
  id: number;
  exam_id: number;
  class_id: number;
  room_id: number;
  seat_number: number;
  student_id: number;
}

export interface BatchCreateSchedule {
  exam_id: number;
  class_ids: number[];
  room_ids: number[];
} 
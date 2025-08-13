import { Student } from '@/types/students';

export function paginateStudents(students: Student[], itemsToShow: number): Student[] {
  return students.slice(0, itemsToShow);
}

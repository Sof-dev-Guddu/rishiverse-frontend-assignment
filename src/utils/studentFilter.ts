import { Student } from '@/types/students';

interface FilterState {
  status: string;
  joiningFrom: string;
  joiningTo: string;
}

export function filterStudents(
  students: Student[],
  filters: FilterState
): Student[] {
  let result = [...students];

  if (filters.status) {
    result = result.filter((s) => s.status.status === filters.status);
  }

  if (filters.joiningFrom && filters.joiningTo) {
    const from = new Date(filters.joiningFrom);
    const to = new Date(filters.joiningTo);
    result = result.filter((s) => {
  if (!s.joiningDate) return false;  
  const d = new Date(s.joiningDate);
  return d >= from && d <= to;
});
  }

  return result;
}

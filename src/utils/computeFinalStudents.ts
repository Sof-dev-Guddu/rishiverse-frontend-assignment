import type { Student } from '@/types/students';
import type { FilterState, PaginationState } from '@/store/features/students/studentSlice'; // or define these types locally
import { filterStudents } from './studentFilter';
import { sortStudents } from './studentSort';
import { paginateStudents } from './studentPagination';

export function computeFinalStudents(
  students: Student[],
  filters: FilterState,
  sortOption: string,
  pagination: PaginationState
): Student[] {
  const filtered = filterStudents(students, filters);
  const sorted = sortStudents(filtered, sortOption ||"");
  const paginated = paginateStudents(sorted, pagination.itemsToShow);
  return paginated;
}

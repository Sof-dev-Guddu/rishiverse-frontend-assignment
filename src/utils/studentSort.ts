import { Student } from '@/types/students';

export function sortStudents(students: Student[], sortOption: string): Student[] {
  const result = [...students];

  result.sort((a, b) => {
    switch (sortOption) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'createdAt-asc':
        return new Date(a.createdAT).getTime() - new Date(b.createdAT).getTime();
      case 'createdAt-desc':
        return new Date(b.createdAT).getTime() - new Date(a.createdAT).getTime();
      default:
        return 0;
    }
  });

  return result;
}

import { Student } from "@/types/students";

const mockData: Student[] = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  discipline: i % 2 === 0 ? "Math" : "Science",
  email: `student${i + 1}@school.com`,
  img: `https://i.pravatar.cc/150?img=${i + 10}`,
  joinedAt: new Date().toISOString(),
}));

export default mockData;
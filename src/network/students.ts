import apiClient from './apiClient';
import type { Student } from '@/types/students';

interface ResponseT<T = any> {
  response: T | null;
  error: string | null;
}



export async function getStudents(): Promise<ResponseT<Student[]>> {
  try {
    const { data } = await apiClient.get<Student[]>(
      `/api/students/read`,
    )
    return { response: data, error: null };
  } catch (err: any) {
    return { response: null, error: err.message || String(err) };
  }
}

export async function getStudentById(id: string | number): Promise<ResponseT<Student>> {
  try {
    const { data } = await apiClient.get<Student>(`/api/students/readOne/${id}`);
    return { response: data, error: null };
  } catch (err: any) {
    return { response: null, error: err.message || String(err) };
  }
}

export async function addStudent(student: Student): Promise<ResponseT<Student>> {
  try {
    const { data } = await apiClient.post<Student>(
      `/api/students/create`,student
    );
    return { response: data, error: null };
  } catch (err: any) {
    return { response: null, error: err.message || String(err) };
  }
}

export async function updateStudent(student: Student): Promise<ResponseT<Student>> {
  try {
    const { data } = await apiClient.put<Student>(`/api/students/update/?id=${student.id}`, student);
    return { response: data, error: null };
  } catch (err: any) {
    return { response: null, error: err.message || String(err) };
  }
}

export async function deleteStudent(id: string | number): Promise<ResponseT<null>> {
  try {
    await apiClient.delete(`/api/students/delete/?id=${id}`);
    return { response: null, error: null };
  } catch (err: any) {
    return { response: null, error: err.message || String(err) };
  }
}

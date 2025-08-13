import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Student } from '@/types/students';
import {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} from '@/network/students';

export const fetchStudents = createAsyncThunk<
  Student[],
  void,
  { rejectValue: string }
>('students/fetch', async (_, { rejectWithValue }) => {
  const { response, error } = await getStudents();
  if (error || !response) {
    return rejectWithValue(error || 'Failed to fetch students');
  }
  return response;
});

export const fetchStudentById = createAsyncThunk<
  Student,
  string,
  { rejectValue: string }
>('students/fetchById', async (id, { rejectWithValue }) => {
  const { response, error } = await getStudentById(id);
  if (error || !response) {
    return rejectWithValue(error || 'Failed to fetch student');
  }
  return response;
});

export const createStudent = createAsyncThunk<
  Student,
  Student,
  { rejectValue: string }
>('students/create', async (newStudent, { rejectWithValue }) => {
  const { response, error } = await addStudent(newStudent);
  if (error || !response) {
    return rejectWithValue(error || 'Failed to create student');
  }
  return response;
});

export const updateStudentThunk = createAsyncThunk<
  Student,
  Student,
  { rejectValue: string }
>('students/update', async (updatedStudent, { rejectWithValue }) => {
  const { response, error } = await updateStudent(updatedStudent);
  if (error || !response) {
    return rejectWithValue(error || 'Failed to update student');
  }
  return response;
});

export const deleteStudentThunk = createAsyncThunk<
  string,           
  string,          
  { rejectValue: string }
>('students/delete', async (id, { rejectWithValue }) => {
  const { response, error } = await deleteStudent(id);
  if (error) {
    return rejectWithValue(error);
  }
  // return id since response is null on delete
  return id;
});

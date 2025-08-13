import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Student } from '@/types/students';
import {
  fetchStudents,
  fetchStudentById,
  createStudent,
  updateStudentThunk,
  deleteStudentThunk,
} from './studentThunk';
import { toast } from 'sonner';
import { computeFinalStudents } from '@/utils/computeFinalStudents';

export interface FilterState {
  status: string;         
  joiningFrom: string;    
  joiningTo: string;      
}

export interface PaginationState {
  itemsToShow: number;
}

interface StudentState {
  students: Student[];        // Raw fetched data
  finalStudents: Student[];   // After sorting/filtering/pagination
  loading: boolean;
  errors: string | null;
  dialog: {
    isOpen: boolean;
    mode: 'add' | 'edit';
    initialData: Student | null;
  };
  selectedStudentIDs: string[];
  filters: FilterState;
  sortOption: string;
  pagination: PaginationState;
}

const initialState: StudentState = {
  students: [],
  finalStudents: [],
  loading: false,
  errors: null,
  dialog: {
    isOpen: false,
    mode: 'add',
    initialData: null,
  },
  selectedStudentIDs: [],
  filters: { status: '', joiningFrom: '', joiningTo: '' },
  sortOption: 'name-asc',
  pagination: { itemsToShow: 20 },
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    openDialog: (
      state,
      action: PayloadAction<{ mode: 'add' | 'edit'; data?: Student }>
    ) => {
      state.dialog.isOpen = true;
      state.dialog.mode = action.payload.mode;
      state.dialog.initialData = action.payload.data || null;
    },
    closeDialog: (state, action: PayloadAction<'add' | 'edit' | undefined>) => {
      state.dialog = {
        isOpen: false,
        mode: action.payload ?? 'add',
        initialData: null,
      };
    },
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
      state.loading = false;
    },
    setErrors: (state, action: PayloadAction<string | null>) => {
      state.errors = action.payload;
      state.loading = false;
    },
    setSelectedStudents: (state, action: PayloadAction<string[]>) => {
      state.selectedStudentIDs = action.payload;
    },
    clearSelectedStudents: (state) => {
      state.selectedStudentIDs = [];
    },
 setSortOption(state, action: PayloadAction<string>) {
      state.sortOption = action.payload;
      state.finalStudents = computeFinalStudents(
        state.students,
        state.filters,
        state.sortOption,
        state.pagination
      );
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      state.filters = action.payload;
      state.finalStudents = computeFinalStudents(
        state.students,
        state.filters,
        state.sortOption,
        state.pagination
      );
    },
    setItemsToShow(state, action: PayloadAction<number>) {
      state.pagination.itemsToShow = action.payload;
      state.finalStudents = computeFinalStudents(
        state.students,
        state.filters,
        state.sortOption,
        state.pagination
      );
    },
 incrementItemsToShow(state) {
  state.pagination.itemsToShow += 20;
  console.log('itemsToShow after increment:', state.pagination.itemsToShow);
  state.finalStudents = computeFinalStudents(
    state.students,
    state.filters,
    state.sortOption,
    state.pagination
  );
  console.log('finalStudents length:', state.finalStudents.length);
},

  },
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
        console.log("from slice student",state.students.length)
         state.finalStudents = computeFinalStudents(
          state.students,
          state.filters,
          state.sortOption,
          state.pagination
        );
        console.log("from slice finalstudent",state.finalStudents.length)
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload ?? action.error.message ?? 'Failed to fetch students';
        toast.error(state.errors);
      })

      // Create Student
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.unshift(action.payload);
        state.loading = false;
        state.dialog = { isOpen: false, mode: 'add', initialData: null };
         state.finalStudents = computeFinalStudents(
          state.students,
          state.filters,
          state.sortOption,
          state.pagination
        );
        toast.success('Student has been created.');
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.dialog = { isOpen: false, mode: 'add', initialData: null };
        state.errors = action.payload ?? action.error.message ?? 'Failed to create student';
        toast.error(state.errors);
      })

      // Update Student
      .addCase(updateStudentThunk.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(updateStudentThunk.fulfilled, (state, action) => {
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.loading = false;
        state.dialog = { isOpen: false, mode: 'add', initialData: null };

         state.finalStudents = computeFinalStudents(
          state.students,
          state.filters,
          state.sortOption,
          state.pagination
        );
        toast.success('Student updated successfully.');
      })
      .addCase(updateStudentThunk.rejected, (state, action) => {
        state.loading = false;
        state.dialog = { isOpen: false, mode: 'add', initialData: null };
        state.errors = action.payload ?? action.error.message ?? 'Failed to update student';
        toast.error(state.errors);
      })

      // Delete Student
      .addCase(deleteStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(s => s.id !== action.payload);
         state.finalStudents = computeFinalStudents(
          state.students,
          state.filters,
          state.sortOption,
          state.pagination
        );
        toast.success('Student deleted successfully.');
      })
      .addCase(deleteStudentThunk.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload ?? action.error.message ?? 'Failed to delete student';
        toast.error(state.errors);
      });
  },
});

export const {
  openDialog,
  closeDialog,
  setStudents,
  setErrors,
  setSelectedStudents,
  clearSelectedStudents,
  setSortOption,
  setFilters,
  setItemsToShow,
  incrementItemsToShow
} = studentSlice.actions;

export default studentSlice.reducer;

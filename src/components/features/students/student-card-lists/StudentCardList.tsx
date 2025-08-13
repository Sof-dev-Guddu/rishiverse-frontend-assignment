"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { incrementItemsToShow, setItemsToShow } from "@/store/features/students/studentSlice";
import { useRouter } from "next/navigation";
import { DeleteAlertDialog } from "@/components/shared/delete-alert/DeleteAlertDialog";
import { deleteStudentThunk } from "@/store/features/students/studentThunk";
import StudentCard from "../student-card/StudentCard";
import LoadingSkeleton from "@/components/shared/loader/LoaderSkeleton";

const ITEMS_INCREMENT = 20;

export default function StudentCardList({ isAdmin }: { isAdmin: boolean }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { finalStudents, pagination, loading, errors } = useSelector(
    (state: RootState) => state.students
  );

  const listRef = useRef<HTMLDivElement>(null);

  const [deleteState, setDeleteState] = useState<{ flag: boolean; id: string }>({
    flag: false,
    id: "",
  });

  
const handleScroll = useCallback(() => {
  if (!listRef.current || loading) return;

  const { scrollTop, scrollHeight, clientHeight } = listRef.current;
  
  const nearBottom = scrollHeight - (scrollTop + clientHeight) < 20;

  if (nearBottom) {
    dispatch(incrementItemsToShow());
  }
  console.log({
  scrollTop,
  scrollHeight, 
  clientHeight,
  threshold: scrollHeight - (scrollTop + clientHeight),
  itemsToShow: pagination.itemsToShow
});
}, [dispatch, loading]);

  
  useEffect(() => {
    const currentList = listRef.current;
    if (!currentList) return;

    currentList.addEventListener("scroll", handleScroll);
    return () => currentList.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

 
  const handleCardClick = (id: string) => {
    router.push(`/dashboard/students/${id}?isAdmin=${isAdmin}`);
  };

  // Cancel delete dialog
  const handleDeleteCancel = () => setDeleteState({ flag: false, id: "" });

  // Confirm delete student
  const handleDeleteConfirm = () => {
    dispatch(deleteStudentThunk(deleteState.id));
    setDeleteState({ flag: false, id: "" });
  };

  if (deleteState.flag) {
    return (
      <DeleteAlertDialog
        open={true}
        onConfirm={handleDeleteConfirm}
        onOpenChange={handleDeleteCancel}
      />
    );
  }

  // Slice students to show according to pagination
  const studentsToShow = finalStudents.slice(0, pagination.itemsToShow);

  return (
    <div
  ref={listRef}
  style={{ 
    height: 'calc(100vh - 180px)', 
    overflowY: 'auto',
    padding: '16px',
    width: '100%' 
  }}
  className="flex flex-wrap gap-6 justify-center"
>
      {errors && <p className="text-red-500">{errors}</p>}
      {!loading && finalStudents.length === 0 && <p>No students found.</p>}

    
       {loading
        ? Array.from({ length: 20 }).map((_, index) => (
            <LoadingSkeleton
              key={index}
              className="w-[200px] h-[300px] rounded-md bg-white"
              showShimmer
            />
          ))
        : studentsToShow.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              isAdmin={isAdmin}
              setDeleteState={setDeleteState}
              handleCardClick={handleCardClick}
            />
          ))}
    </div>
  );
}

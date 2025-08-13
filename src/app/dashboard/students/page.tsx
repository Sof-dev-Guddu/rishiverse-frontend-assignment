"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchStudents } from "@/store/features/students/studentThunk";
import SortStudent from "@/components/features/students/sort-students/SortStudent";
import { SidebarTrigger } from "@/components/ui/sidebar";
import StudentCardList from "@/components/features/students/student-card-lists/StudentCardList"; // import new component
import { openDialog } from "@/store/features/students/studentSlice";
import GradientButton from "@/components/shared/button/GradientButton";
import FilterDropdown from "@/components/features/students/filter-student/FilterDropdown";

function Page() {
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin");
    setIsAdmin(adminFlag === "true");
  }, []);

  return (
    <>
      {/* Filter & SOrting */}
      <div className=" w-full  z-50 flex items-center">
         <div className="flex flex-wrap justify-between items-center  w-full p-2  md:px-12">
           <div className="flex flex-wrap justify-between items-center gap-1 md:gap-4 ">
            <div className="md:hidden">
             <SidebarTrigger />
            </div>
            <SortStudent />
            <FilterDropdown/>
           </div>
           <div>
            {isAdmin && (
          <GradientButton
            onClick={() => dispatch(openDialog({ mode: "add" }))}
          >
            Add Student
          </GradientButton>
        )}
           </div>
        </div>
      </div>

      {/* Content */}
      <section className="p-2">
       

        <StudentCardList isAdmin={isAdmin} />
      </section>
    </>
  );
}

export default Page;

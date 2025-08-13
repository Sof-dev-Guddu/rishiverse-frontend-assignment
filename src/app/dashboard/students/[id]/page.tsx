"use client";

import React, { useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks"; 
import { openDialog } from "@/store/features/students/studentSlice";
import LoadingSkeleton from "@/components/shared/loader/LoaderSkeleton";
import GradientButton from "@/components/shared/button/GradientButton";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function StudentDetailsPage() {
  const params = useParams<{ id: string }>();
   const searchParams = useSearchParams();
    const isAdmin = searchParams.get("isAdmin") === "true";
  const router = useRouter();

  const { students, loading, errors } = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();

  // Find the student by ID from Redux store
  const student = useMemo(
    () => students.find((s) => s.id === params.id),
    [students, params.id]
  );

  if (loading) {
    return (
      <>
        <LoadingSkeleton />
        <p className="p-4">Loading student details...</p>
      </>
    );
  }

  if (errors) {
    return <p className="p-4 text-red-500">{errors}</p>;
  }

  if (!student) {
    return (
      <div className="p-4">
        <p className="text-gray-500">Student not found.</p>
        <button
          onClick={() => router.back()}
          className="mt-2 text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>
    );
  }

  // Helper functions
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  const formatAddress = (address?: { city?: string; state?: string; pin?: string }) => {
    if (!address || Object.keys(address).length === 0) return "N/A";
    return `${address.city || ""}, ${address.state || ""} - ${address.pin || ""}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-2 bg-white rounded-lg shadow">
      <SidebarTrigger className='md:hidden'/>
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="inline-block mb-4 text-blue-600 hover:underline"
        >
          ← Back
        </button>
        <div>
          {isAdmin && 
          <GradientButton onClick={() => dispatch(openDialog({ mode: "edit", data: student }))}>
            Edit Details
          </GradientButton>
          }
        </div>
      </div>

      <div className="flex items-center gap-6">
        <img
          src={student.img || "/images/default-avatar.webp"}
          alt={student.name}
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{student.name}</h1>
          <p className="text-gray-600">{student.discipline}</p>
          <p className="text-gray-500 text-sm flex items-center gap-2"><span
                      className={cn(
                        'inline-block h-4 w-4 rounded-full',
                        student.status.status === 'active' ? 'bg-green-700' : 'bg-yellow-600'
                      )}
                    ></span>{' '}
                    Status: {student.status.status}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>Joining Date:</strong> {formatDate(student.joiningDate)}</p>
        <p><strong>Created At:</strong> {formatDate(student.createdAT)}</p>
        <p><strong>Address:</strong> {formatAddress(student.address)}</p>
      </div>
    </div>
  );
}

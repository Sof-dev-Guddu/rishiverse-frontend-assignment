'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Student {
  id: string | number;
  name: string;
  discipline: string;
  img?: string;
  status: {
    status: 'active' | 'completed';
  };
}

interface StudentCardProps {
  student: Student;
  isAdmin?: boolean;
  setDeleteState?: (state: { flag: boolean; id: string }) => void;
  handleCardClick: (id: string) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  isAdmin = false,
  setDeleteState,
  handleCardClick,
}) => {
  return (
    <div key={student.id} className="relative w-[200px] h-[300px]">
      {isAdmin && setDeleteState && (
        <button
          onClick={() => setDeleteState({ flag: true, id: String(student.id) })}
          className="absolute top-0 right-0 bg-secondary text-white rounded-lg px-3 py-1 m-1 hover:opacity-80 z-10"
        >
          Delete
        </button>
      )}
      <div className="w-full h-full bg-white flex flex-col items-center justify-center p-4 rounded-md shadow hover:scale-105 transition border border-bg-gray-100">
        <img
          src={student.img || '/images/default-avatar.webp'}
          alt={student.name}
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <h3 className="text-lg font-semibold">{student.name}</h3>
        <p className="text-sm">{student.discipline}</p>
        <p className="flex items-center gap-1">
          <span
            className={cn(
              'inline-block h-4 w-4 rounded-full',
              student.status.status === 'active' ? 'bg-green-700' : 'bg-yellow-600'
            )}
          ></span>{' '}
          Status: {student.status.status}
        </p>
        <button
          onClick={() => handleCardClick(String(student.id))}
          className="border-b border-sky-700 text-sky-700 hover:border-sky-500 hover:text-sky-700 cursor-pointer mt-2"
        >
          See Details &rarr;
        </button>
      </div>
    </div>
  );
};

export default StudentCard;

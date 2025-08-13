import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setSortOption } from "@/store/features/students/studentSlice";
import { ArrowDownUp } from 'lucide-react';

function SortStudent() {
  const [selectedOption,setSelectionOption]=useState<String>("none")
  const dispatch = useDispatch<AppDispatch>();
  const sortOption = useSelector((state: RootState) => state.students.sortOption);

  const options = [
    { value: 'name-asc', label: 'Name Ascending (A-Z)' },
    { value: 'name-desc', label: 'Name Descending (Z-A)' },
    { value: 'createdAt-asc', label: 'Created At Ascending (new-old)' },
    { value: 'createdAt-desc', label: 'Created At Descending (old-new)' },
  ];

  const handleSelect = (value: string) => {
    dispatch(setSortOption(value));
    setSelectionOption(value)
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-1 border border-gray-200 bg-white rounded-xl px-2 md:px-10 py-1 text-gray-700'>
       <ArrowDownUp size={16} /> sort by : <span className='text-gray-800'>{selectedOption}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='sr-only'>Sort Options</DropdownMenuLabel>
        
        {options.map(({ value, label }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => handleSelect(value)}
            className={value === sortOption ? "font-bold text-blue-600" : ""}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortStudent;

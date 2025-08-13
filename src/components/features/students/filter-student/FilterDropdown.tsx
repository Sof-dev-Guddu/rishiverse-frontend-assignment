"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import GradientButton from "@/components/shared/button/GradientButton";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { setFilters } from "@/store/features/students/studentSlice";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const FilterDropdown: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState<string>("");
  const [joiningFrom, setJoiningFrom] = useState<string>("");
  const [joiningTo, setJoiningTo] = useState<string>("");

  const handleApply = (close: () => void) => {
    dispatch(setFilters({ status, joiningFrom, joiningTo }));
    close(); // closes dropdown
  };

  const handleReset = (close: () => void) => {
    setStatus("");
    setJoiningFrom("");
    setJoiningTo("");
    dispatch(setFilters({ status: "", joiningFrom: "", joiningTo: "" }));
    close(); // closes dropdown
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-gray-200 bg-white rounded-xl px-2 md:px-10 py-1 text-gray-700 flex items-center gap-1">
        <SlidersHorizontal size={16} /> Filters
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-4 flex flex-col gap-4">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <DropdownMenuLabel>Joining Date</DropdownMenuLabel>
        <div className="flex flex-col gap-2">
          <label htmlFor="date-from">From:</label>
          <input
           id="date-from"
            type="date"
            value={joiningFrom}
            onChange={(e) => setJoiningFrom(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <label htmlFor="date-to">To:</label>
          <input
          id="date-to"
            type="date"
            value={joiningTo}
            onChange={(e) => setJoiningTo(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>

        <DropdownMenuSeparator />

        <div className="flex justify-end items-center gap-2">
          <Button
            variant="outline"
            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            onClick={(e: any) => handleReset(() => e.currentTarget.closest('div[role="menu"]')?.blur())}
          >
            Reset
          </Button>
          <GradientButton
            onClick={(e: any) => handleApply(() => e.currentTarget.closest('div[role="menu"]')?.blur())}
          >
            Apply
          </GradientButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;

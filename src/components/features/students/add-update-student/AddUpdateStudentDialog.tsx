"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RootState, AppDispatch } from "@/store";
import { closeDialog } from "@/store/features/students/studentSlice";
import { createStudent, updateStudentThunk } from "@/store/features/students/studentThunk";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { StudentDetails, studentDetailsSchema } from "@/schemas/studentDetails";
import { useEffect } from "react";

export default function AddUpdateStudentDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, dialog } = useSelector((state: RootState) => state.students);
  const { isOpen, mode, initialData } = dialog;

  const methods = useForm<StudentDetails>({
    resolver: zodResolver(studentDetailsSchema),
    defaultValues: {
      id: "",
      name: "",
      discipline: "",
      phone: "",
      email: "",
      img: "",
      status: { status: "active" },
      joiningDate: "",
      address: { city: "", state: "", pin: "" },
    },
  });

  useEffect(() => {
    if (initialData) {
      methods.reset(initialData);
    } else {
      methods.reset({
        id: "",
        name: "",
        discipline: "",
        phone: "",
        email: "",
        img: "",
        status: { status: "active" },
        joiningDate: "",
        address: { city: "", state: "", pin: "" },
      });
    }
  }, [initialData, methods]);

  const onSubmit = (data: StudentDetails) => {
  if (mode === "add") {
    dispatch(createStudent({
      ...data,
      createdAT: new Date().toISOString(),
    }));
  } else if (mode === "edit" && initialData) {
    dispatch(updateStudentThunk({
      ...initialData,
      ...data,
      createdAT: initialData.createdAT, // keep original creation date
    }));
  }
};

  return (
    <Dialog key={mode} open={isOpen} onOpenChange={() => dispatch(closeDialog(mode))}>
      <DialogContent className="w-[90vw] md:w-[65vw] max-w-[90vw] max-h-[90vh] flex flex-col">
  <DialogHeader>
    <DialogTitle>{mode === "add" ? "Add Student" : "Edit Student"}</DialogTitle>
    <DialogDescription>
      {mode === "add"
        ? "Fill in the form to add a new student."
        : "Update the selected student."}
    </DialogDescription>
  </DialogHeader>

  <Separator />

  <FormProvider {...methods}>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        methods.handleSubmit(onSubmit)();
      }}
      className="flex flex-col flex-1 overflow-hidden"
    >
      {/* Scrollable form fields */}
      <div className="flex-1 overflow-y-auto px-2 md:px-0 py-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField name="name" label="Name" />
          <InputField name="discipline" label="Discipline" />
          <InputField name="phone" label="Phone" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField name="email" label="Email" />
          <SelectField
            name="status.status"
            label="Status"
            options={["active", "completed"]}
          />
          <InputField name="joiningDate" label="Joining Date" type="date" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField name="address.city" label="City" />
          <InputField name="address.state" label="State" />
          <InputField name="address.pin" label="PIN Code" />
        </div>

        <InputField name="img" label="Image URL" />
      </div>

      {/* Footer always visible */}
      <DialogFooter className="flex justify-end gap-2 mt-2">
        <DialogClose asChild>
          <Button
            type="button"
            variant="destructive"
            onClick={() => dispatch(closeDialog(mode))}
          >
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "add" ? "Adding..." : "Updating..."}
            </>
          ) : mode === "add" ? (
            "Add Student"
          ) : (
            "Update Student"
          )}
        </Button>
      </DialogFooter>
    </form>
  </FormProvider>
</DialogContent>

    </Dialog>
  );
}

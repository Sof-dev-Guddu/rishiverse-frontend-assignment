"use client"

import AddUpdateStudentDialog from "@/components/features/students/add-update-student/AddUpdateStudentDialog";
import { withRedux } from "@/hoc/withRedux";

const AddUpdateStudentDialogWithRedux= withRedux(AddUpdateStudentDialog)

export default AddUpdateStudentDialogWithRedux
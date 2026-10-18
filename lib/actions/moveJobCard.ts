"use server";
import { revalidatePath } from "next/cache";
import { Column, JobApplication } from "../models";
import {
  JobApplication as JobApplicationType,
  Column as ColumnType,
} from "@/lib/models/model.types";

export const handleJobCardMove = async (
  job: JobApplicationType,
  col: ColumnType,
) => {
  const colId = col?._id;
  const jobId = job?._id;
  //if job id already exists in column dont push it again
  if (colId === job.columnId) {
    return;
  }
  //update the columnId in jobApplication object to columnID that is clicked
  await Column.findByIdAndUpdate(colId, {
    $addToSet: {
      jobApplications: jobId,
    },
  });
  //remove the job application from the previous column's jobApplications array
  await Column.findByIdAndUpdate(job.columnId, {
    $pull: { jobApplications: jobId },
  });
  //update the columnId in the job application to the new column ID
  await JobApplication.findByIdAndUpdate(jobId, {
    $set: {
      columnId: colId,
      status: col?.name,
    },
  });
  revalidatePath("/dashboard");
};

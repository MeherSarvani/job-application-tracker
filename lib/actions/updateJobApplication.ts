"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "../auth";
import connectDB from "../db";
import { JobApplication } from "../models";
import { JobApplicationData } from "./createJobApplication";

export default async function updateJobApplication(
  jobId: string,
  formData: JobApplicationData,
) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("no active session found");
  }
  await connectDB();

  const updatedJobApplication = await JobApplication.findByIdAndUpdate(
    jobId,
    {
      $set: {
        position: formData.jobTitle,
        company: formData.company,
        location: formData.location,
        salary: formData.salary,
        jobUrl: formData.jobUrl,
        tags: formData.tags,
        jobDescription: formData.description,
        notes: formData.notes,
      },
    },
    { new: true },
  );
  revalidatePath("/dashboard");
  return JSON.parse(JSON.stringify(updatedJobApplication));
}

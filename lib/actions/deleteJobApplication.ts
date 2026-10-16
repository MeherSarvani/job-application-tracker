"use server";
import { revalidatePath } from "next/cache";
import { JobApplication, Column } from "../models";
import { getSession } from "../auth";
import connectDB from "../db";

export default async function deleteJobApplication(jobId: string) {
  // Implement the logic to delete a job application here
  const session = await getSession();
  if (!session?.user) {
    throw new Error("No active session found");
  }

  await connectDB();
  //find the job application and delete it along with its associated column entry

  const job = await JobApplication.findById(jobId);
  if (!job) {
    throw new Error("No job application found");
  }

  //delete the job application in column
  await Column.findByIdAndUpdate(job.columnId, {
    $pull: { jobApplications: job._id },
  });
  //delete the job application itself
  await JobApplication.findByIdAndDelete(jobId);

  revalidatePath("/dashboard");
}

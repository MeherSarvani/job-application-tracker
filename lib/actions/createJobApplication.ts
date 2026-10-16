"use server";

import { getSession } from "../auth";
import { revalidatePath } from "next/cache";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../models";

export type JobApplicationData = {
  jobTitle: string;
  company: string;
  location?: string;
  columnId: string;
  boardId: string;
  salary: string;
  jobUrl?: string;
  tags?: string[];
  description?: string;
  notes?: string;
};
export default async function createJobApplication(data: JobApplicationData) {
  // Implement the logic to create a job application in the database here
  //1. check if the user is having logged in session
  //2.connect to the database
  //3.validate the input data ,boardId and columnId
  //4.create the job application in the database
  //5.while passing the data calculate the order (logic: latest added application gets the highest order)
  //6.Assign the list to the appropriate column in the board
  //7.return the created job application data object

  const session = await getSession();
  if (!session?.user) {
    throw new Error("no active session found");
  }
  await connectDB();

  const {
    jobTitle,
    company,
    location,
    salary,
    jobUrl,
    tags,
    description,
    notes,
    boardId,
    columnId,
  } = data;

  if (!jobTitle || !company || !boardId || !columnId) {
    throw new Error("required data is missing");
  }
  const board = await Board.findOne({ _id: boardId, userId: session.user.id });
  if (!board) {
    throw new Error("invalid board id");
  }

  const column = await Column.findOne({ _id: columnId, boardId: boardId });
  if (!column) {
    throw new Error("invalid column id");
  }
  const maxOrder = (await JobApplication.findOne({ columnId })
    .sort({ order: -1 })
    .select("order")
    .lean()) as { order: number } | null;

  const jobApplication = await JobApplication.create({
    position: jobTitle,
    company,
    location,
    salary,
    jobUrl,
    tags: tags || [],
    jobDescription: description,
    notes,
    status: column?.name,
    boardId,
    columnId,
    userId: session.user.id,
    order: maxOrder ? maxOrder.order + 1 : 0,
  });
  if (jobApplication?.error) {
    throw new Error("failed to create application");
  }
  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });
  revalidatePath("/dashboard");
  return { data: JSON.parse(JSON.stringify(jobApplication)) };
}

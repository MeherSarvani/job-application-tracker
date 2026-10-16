import mongoose, { Schema } from "mongoose";

export type JobApplication = {
  //all job details
  company: string;
  position: string;
  jobDescription: string;
  location: string;
  salary: string;
  jobUrl: string;
  tags: string[];
  notes: string;
  appliedDate?: Date;
  status: string;
  //board details
  userId: string;
  boardId: mongoose.Types.ObjectId;
  columnId: mongoose.Types.ObjectId;
  //timestamps
  createdAt: Date;
  updatedAt: Date;
};

const JobApplicationSchema = new Schema<JobApplication>(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    jobUrl: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    notes: {
      type: String,
      required: true,
    },
    appliedDate: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      default: "applied",
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Column",
      index: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Board",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.JobApplication ||
  mongoose.model<JobApplication>("JobApplication", JobApplicationSchema);

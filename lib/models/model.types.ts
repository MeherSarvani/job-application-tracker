export type Board = {
  _id: string;
  name: string;
  userId: string;
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
};
export type Column = {
  _id: string;
  name: string;
  boardId: string;
  jobApplications: JobApplication[];
  createdAt: Date;
  updatedAt: Date;
  order: number;
};
export type JobApplication = {
  _id: string;
  company: string;
  position: string;
  jobDescription: string;
  location: string;
  salary: string;
  jobUrl: string;
  tags: string[];
  notes: string;
  appliedDate: Date;
  status: string;
  order: number;
  //board details
  userId: string;
  boardId: string;
  columnId: string;
  //timestamps
  createdAt: Date;
  updatedAt: Date;
};

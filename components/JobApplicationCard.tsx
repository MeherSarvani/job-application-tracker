"use client";
import { JobApplication, Column } from "@/lib/models/model.types";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { handleJobCardMove } from "@/lib/actions/moveJobCard";
import JobApplicationModal from "./JobApplicationModal";
import { useState } from "react";
import deleteJobApplication from "@/lib/actions/deleteJobApplication";

export type JobApplicationCardProps = {
  job: JobApplication;
  column: Column[];
};

export default function JobApplicationCard({
  job,
  column,
}: JobApplicationCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleDeleteJob(job: JobApplication) {
    await deleteJobApplication(job._id);
  }

  return (
    <>
      <>
        <Card>
          <CardContent>
            <div className="flex justify-between items-start">
              <div className="flex gap-2 flex-col">
                <h3 className="text-lg font-bold">{job?.position}</h3>
                <p className="text-sm text-muted-foreground">{job?.company}</p>
                <p className="text-sm text-muted-foreground">
                  {job?.jobDescription}
                </p>
                {job?.tags?.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {job?.tags?.map((tag, key) => (
                      <span
                        key={key}
                        className="bg-blue-200 text-gray-800 px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div>
                  <a href={job?.jobUrl} target="_blank">
                    <ExternalLink></ExternalLink>
                  </a>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon">
                    <MoreVertical></MoreVertical>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="flex gap-2 flex-col min-w-37.5"
                  align="end"
                >
                  <DropdownMenuItem
                    onClick={() => {
                      setIsEditing(true);
                      console.log("Edit clicked");
                    }}
                  >
                    <Edit2></Edit2> Edit
                  </DropdownMenuItem>
                  {column
                    ?.filter(
                      (col) => col._id.toString() !== job?.columnId.toString(),
                    )
                    ?.map((col, key) => (
                      <DropdownMenuItem
                        key={key}
                        onClick={() => handleJobCardMove(job, col)}
                      >
                        MoveTo {col.name}
                      </DropdownMenuItem>
                    ))}
                  <DropdownMenuItem onClick={() => handleDeleteJob(job)}>
                    <Trash2></Trash2>Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      </>
      <JobApplicationModal
        job={job}
        boardId={job.boardId}
        columnId={job.columnId}
        isEditingJobApplication={isEditing}
        mode="edit"
        setEditing={setIsEditing}
      />
    </>
  );
}

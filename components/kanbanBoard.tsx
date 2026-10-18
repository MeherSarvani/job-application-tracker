import { Board, Column, JobApplication } from "@/lib/models/model.types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreVertical,
  Trash2,
  XCircle,
} from "lucide-react";
import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import JobApplicationModal from "./JobApplicationModal";
import JobApplicationCard from "./JobApplicationCard";

const COLUMN_CONFIG: { color: string; icon: ReactNode }[] = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className=" h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className=" h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className=" h-4 w-4" />,
  },
];

export default function KanbanBoard({
  boardDetails,
  userId,
}: {
  boardDetails: Board;
  userId: string;
}) {
  const columns = boardDetails.columns;

  const DroppableColumn = ({
    column,
    config,
    // boardId,
  }: {
    column: Column;
    config: { color: string; icon: ReactNode };
  }) => {
    //1.get order value sorted job application data
    //2.render a jobCard for each job application in the column
    const sortedJobApplications = column?.jobApplications?.sort(
      (a, b) => a.order - b.order,
    );
    return (
      <>
        <Card className="min-w-85 shadow-md p-0 border border-gray-200">
          <CardHeader
            className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {config.icon}
                <CardTitle>{column.name}</CardTitle>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost">
                    <MoreVertical className="cursor-pointer h-4 w-4"></MoreVertical>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-destructive cursor-pointer">
                    <Trash2 className="mr-2 h-4 w-4"></Trash2>
                    Delete Column
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 h-200 overflow-y-auto rounded-b-lg shadow-md pt-4 bg-gray-50/50">
            {sortedJobApplications?.map((job, key) => {
              return <SortableJobCard key={key} job={job}></SortableJobCard>;
            })}
            <JobApplicationModal
              boardId={boardDetails?._id}
              columnId={column._id}
              mode="add"
            />
          </CardContent>
        </Card>
      </>
    );
  };

  //create job card
  const SortableJobCard = ({ job }: { job: JobApplication }) => {
    const sortedColumns = columns.sort((a, b) => a.order - b.order);
    return (
      <div>
        <JobApplicationCard
          job={job}
          column={sortedColumns}
        ></JobApplicationCard>
      </div>
    );
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column, key) => {
          const config = COLUMN_CONFIG[key];
          return (
            <div key={key}>
              <DroppableColumn
                key={key}
                column={column}
                config={config}
              ></DroppableColumn>
            </div>
          );
        })}
      </div>
    </div>
  );
}

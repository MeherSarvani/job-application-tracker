import KanbanBoard from "@/components/kanbanBoard";
import { getSession } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { Suspense } from "react";

const getBoardDetails = async (userId: string) => {
  "use cache";
  await connectDB();
  const board = await Board.findOne({
    name: "Job Hunt",
    userId,
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  return JSON.parse(JSON.stringify(board));
};
const DashboardPage = async () => {
  const session = await getSession();
  const board = await getBoardDetails(session!.user.id);
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Job Hunt</h1>
          <p className="text-gray-600">
            Tracking your job applications and progress.
          </p>
        </div>
        <KanbanBoard boardDetails={board} userId={session!.user.id} />
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
}

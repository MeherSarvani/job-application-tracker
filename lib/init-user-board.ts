import connectDB from "./db";
import { Board, Column } from "./models";
const DEFAULT_COLUMNS = [
  {
    name: "Wish List",
    order: 0,
  },
  {
    name: "Applied",
    order: 1,
  },
  {
    name: "Interview",
    order: 2,
  },
  {
    name: "Offer",
    order: 3,
  },
  {
    name: "Rejected",
    order: 4,
  },
];
export default async function initializeUserBoard(userId: string) {
  try {
    //connect to DB
    await connectDB();
    //check id board exists
    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });
    if (existingBoard) {
      return existingBoard;
    }
    //create board
    const board = await Board.create({
      name: "Job Hunt",
      userId,
      columns: [], //initialize with empty columns
    });
    //we need to create default columns
    const column = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          jobApplications: [],
        }),
      ),
    );
    //set the columnId's to Board
    board.columns = column.map((col) => col._id);
    //save the collections creation
    await board.save();
  } catch (e) {
    throw e;
  }
}

import { create } from "zustand";

interface TaskContent {
  id: number;
  title: string;
  description?: string | undefined;
}

export type TaskState = "todo" | "inProgress" | "inReview" | "done";

interface TasksStoreState {
  tasks: Record<TaskState, TaskContent[]>;
}

export const useTasksStore = create<TasksStoreState>()((set) => ({
  tasks: {
    todo: [
      {
        id: 1,
        title: "Organize Living Room",
        description: "Make this room organized for your birthday party",
      },
    ],
    inProgress: [],
    inReview: [],
    done: [],
  },
}));

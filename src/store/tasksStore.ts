import { create } from "zustand";
import { z } from "zod";

interface TaskContent {
  id: number;
  title: string;
  description?: string | undefined;
}

export const taskStates = ["todo", "inProgress", "inReview", "done"] as const;
export const zodTaskState = z.enum(taskStates);
export type TaskState = z.infer<typeof zodTaskState>;

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

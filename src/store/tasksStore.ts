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

export const stateTitle: Record<TaskState, string> = {
  todo: "Todo",
  inProgress: "In Progress",
  inReview: "In Review",
  done: "Done",
};

interface TasksStoreState {
  lastId: number;
  tasks: Record<TaskState, TaskContent[]>;
  addNewTask: (
    taskContent: Omit<TaskContent, "id">,
    taskState: TaskState,
  ) => void;
}

export const useTasksStore = create<TasksStoreState>()((set) => ({
  lastId: 1,
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
  addNewTask: (taskContent, taskState) =>
    set(({ tasks, lastId }) => {
      const newTask: TaskContent = {
        ...taskContent,
        id: lastId + 1,
      };

      return {
        lastId: lastId + 1,
        tasks: {
          ...tasks,
          [taskState]: [...tasks[taskState], newTask],
        },
      };
    }),
}));

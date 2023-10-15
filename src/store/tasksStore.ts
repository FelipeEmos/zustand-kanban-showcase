import { create } from "zustand";
import { z } from "zod";

export interface TaskContent {
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
  editTaskState: (
    taskId: number,
    taskState: TaskState,
    newState: TaskState,
  ) => void;
  deleteTask: (taskId: number, taskState: TaskState) => void;
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
  editTaskState: (taskId, taskState, newState) =>
    set(({ tasks }) => {
      if(taskState === newState) {
        return {};
      }

      const selectedTask = tasks[taskState].find((t) => t.id === taskId);
      if (!selectedTask) {
        return {};
      }

      return {
        tasks: {
          ...tasks,
          [taskState]: tasks[taskState].filter((t) => t.id !== taskId),
          [newState]: [...tasks[newState], selectedTask],
        },
      };
    }),
  deleteTask: (taskId, taskState) =>
    set(({ tasks }) => ({
      tasks: {
        ...tasks,
        [taskState]: tasks[taskState].filter((t) => t.id !== taskId),
      },
    })),
}));

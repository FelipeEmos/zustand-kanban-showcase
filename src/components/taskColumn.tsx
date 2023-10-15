import { Separator } from "./ui/separator";
import { cn } from "~/utils/utils";
import { type TaskState, useTasksStore } from "~/store/tasksStore";
import { Task } from "./task";

interface Props {
  title: string;
  taskState: TaskState;
  className?: string;
}

export const TaskColumn = ({
  title,
  taskState,
  className,
}: Props): JSX.Element => {
  const tasks = useTasksStore((state) => state.tasks[taskState]);

  return (
    <div className={cn("flex w-60 flex-col gap-4 bg-gray-600 p-4", className)}>
      <div>
        <p className="text-2xl text-white">{title}</p>
        <Separator className="mt-4" />
      </div>
      {tasks.map((task) => (
        <Task key={task.id} taskContent={task} taskState={taskState} />
      ))}
    </div>
  );
};

import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Brush, MoreVerticalIcon, Trash } from "lucide-react";

import { Button } from "src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import {
  type TaskContent,
  type TaskState,
  stateTitle,
  taskStates,
  useTasksStore,
} from "~/store/tasksStore";
import { cn } from "~/utils/utils";

interface TaskProps {
  taskContent: TaskContent;
  taskState: TaskState;
}

const DeleteMenuItem = ({ taskContent, taskState }: TaskProps): JSX.Element => {
  const deleteTask = useTasksStore((state) => state.deleteTask);

  const onClick = useCallback(
    () => deleteTask(taskContent.id, taskState),
    [deleteTask, taskContent.id, taskState],
  );

  return (
    <DropdownMenuItem onClick={onClick}>
      <Trash className="mr-2 h-4 w-4" />
      <span>Delete</span>
      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};

const EditStateSubmenuItem = ({
  taskContent,
  taskState,
}: TaskProps): JSX.Element => {
  const editTaskState = useTasksStore((state) => state.editTaskState);

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Brush className="mr-2 h-4 w-4" />
        <span>Edit State</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {taskStates.map((state) => (
            <DropdownMenuItem
              key={state}
              onClick={() => editTaskState(taskContent.id, taskState, state)}
            >
              <span>{stateTitle[state]}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const CardOptionsDropdownMenu = ({
  className,
  taskContent,
  taskState,
}: TaskProps & {
  className?: string;
}): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("h-6 w-6", className)}
        >
          <MoreVerticalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <EditStateSubmenuItem taskContent={taskContent} taskState={taskState} />
        <DeleteMenuItem taskContent={taskContent} taskState={taskState} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Task = ({ taskContent, taskState }: TaskProps): JSX.Element => {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex flex-row">
          <CardTitle className="grow pr-4 text-xl">
            {taskContent.title}
          </CardTitle>
          <CardOptionsDropdownMenu
            className="mt-1"
            taskContent={taskContent}
            taskState={taskState}
          />
        </div>
      </CardHeader>
      {taskContent?.description && (
        <CardContent className="p-4">
          <CardDescription>{taskContent.description}</CardDescription>
        </CardContent>
      )}
    </Card>
  );
};

import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "src/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { Textarea } from "./ui/textarea";
import { type ChangeEventHandler, useCallback, useState } from "react";
import { type TaskState, zodTaskState } from "~/store/tasksStore";

// ToImprove: Use a proper Form Lib like React Hook Form
const useForm = () => {
  const [title, setTitle] = useState("Untitled Task");
  const onTitleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setTitle(event.target.value),
    [],
  );

  const [description, setDescription] = useState<string | undefined>(undefined);
  const onDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((event) => setDescription(event.target.value), []);

  const [taskState, setTaskState] = useState<TaskState>("todo");
  const onSelectTaskState = useCallback((newValue: string) => {
    const parsedValue = zodTaskState.safeParse(newValue);
    if (parsedValue.success) {
      setTaskState(parsedValue.data);
    }
  }, []);

  const onSubmit = useCallback(() => {
    console.log({
      title,
      description,
      taskState,
    });
  }, [description, taskState, title]);

  return {
    title,
    onTitleChange,
    description,
    onDescriptionChange,
    taskState,
    onSelectTaskState,
    onSubmit,
  };
};

export const NewTaskSheet = (): JSX.Element => {
  const {
    title,
    onTitleChange,
    description,
    onDescriptionChange,
    taskState,
    onSelectTaskState,
    onSubmit,
  } = useForm();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>New Task</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Task</SheetTitle>
          <SheetDescription>Create a new Task for you Kanban board</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={onTitleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              className="col-span-3"
              onChange={onDescriptionChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              State
            </Label>
            <Select onValueChange={onSelectTaskState} value={taskState}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select State</SelectLabel>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="inReview">In Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={onSubmit} type="submit">
              Confirm
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

import { type PropsWithChildren } from "react";
import { Separator } from "./ui/separator";
import { cn } from "~/utils/utils";

interface Props extends PropsWithChildren {
  title?: string;
  className?: string;
}

export const Column = ({ title, children, className }: Props): JSX.Element => {
  return (
    <div className={cn("flex w-60 flex-col gap-4 bg-gray-600 p-4", className)}>
      <div>
        <p className="text-2xl text-white">{title}</p>
        <Separator className="mt-4" />
      </div>
      {children}
    </div>
  );
};

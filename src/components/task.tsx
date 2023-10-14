import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Props {
  title: string;
  description?: string;
}

export const Task = ({ title, description }: Props): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    </Card>
  );
};

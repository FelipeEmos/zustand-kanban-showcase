import Head from "next/head";
import { NewTaskSheet } from "~/components/newTaskSheet";
import { TaskColumn } from "~/components/taskColumn";
import { stateTitle, taskStates } from "~/store/tasksStore";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center">
        <div className="p-4">
          <div className="py-4">
            <NewTaskSheet />
          </div>
          <div className="flex flex-row gap-4">
            {taskStates.map((state) => (
              <TaskColumn
                key={state}
                taskState={state}
                title={stateTitle[state]}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

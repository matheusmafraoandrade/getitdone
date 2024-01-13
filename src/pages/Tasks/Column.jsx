import { Button } from "@/shadcn/components/ui/button";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { PlusIcon } from "@radix-ui/react-icons";
import NewTaskDialog from "./NewTaskDialog";
import { useState } from "react";

export default function Column({
  column,
  tasks,
  showNewTaskDialog,
  setShowNewTaskDialog,
}) {
  const [selectedColumn, setSelectedColumn] = useState("");
  const getColumnName = (id) => {
    switch (id) {
      case "column-1":
        return "backlog";
      case "column-2":
        return "todo";
      case "column-3":
        return "doing";
      case "column-4":
        return "review";
      default:
        return "backlog";
    }
  };

  return (
    <div className="fake-container sm:w-1/4 bg-secondary/50 p-5 border border-border rounded-xl flex flex-col">
      <h3 className="font-semibold">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => {
          return (
            <div
              className="task-list mt-5 flex-grow min-h-[300px] flex flex-col justify-between"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.length ? (
                tasks?.map((task, index) => (
                  <Task
                    columnId={column.id}
                    key={task?.id}
                    task={task}
                    index={index}
                  />
                ))
              ) : (
                <div></div>
              )}
              {provided.placeholder}
              <NewTaskDialog
                open={showNewTaskDialog}
                setOpen={setShowNewTaskDialog}
                selectedColumn={selectedColumn}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="shadow-sm"
                  onClick={() => {
                    setSelectedColumn(getColumnName(column.id));
                    localStorage.setItem(
                      "selectedColumn",
                      getColumnName(column.id)
                    );
                    setShowNewTaskDialog(true);
                  }}
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Adicionar tarefa
                </Button>
              </NewTaskDialog>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

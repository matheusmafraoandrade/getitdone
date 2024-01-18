import LabelSvg from "@/components/Label";
import { useUserContext } from "@/hooks/useUserContext";
import { Badge } from "@/shadcn/components/ui/badge";
import getInitials from "@/utils/getInitials";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Draggable } from "react-beautiful-dnd";
import calculateDaysUntilDue from "@/utils/daysUntilDue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { useFirestore } from "@/hooks/useFirestore";
import { arrayRemove } from "firebase/firestore";

export default function Task({ task, index, columnId }) {
  const { users } = useUserContext();
  const { userDoc } = useUserContext();
  const { deleteSubDocument: deleteTask } = useFirestore("teams");
  const { updateDocument: updateTeam } = useFirestore("teams");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "standby":
        return "green";
      case "low":
        return "yellow";
      case "medium":
        return "orange";
      case "high":
        return "red";
      default:
        return "gray";
    }
  };

  const removeTask = async (taskId) => {
    await deleteTask(userDoc.teamId, "tasks", taskId);
    await updateTeam(userDoc.teamId, {
      [columnId]: arrayRemove(taskId),
    });
  };

  if (!task) return null;

  const assignedMembers = users?.filter((u) =>
    task?.assignedMembers.includes(u.id)
  );

  return (
    <Draggable draggableId={task?.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className={`fake-container p-5 border border-border mb-2 rounded-lg bg-background shadow-sm ${
              snapshot.isDragging && "bg-primary/20"
            }`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{task?.title}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsHorizontalIcon className="w-6 h-6" role="button" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => removeTask(task.id)}>
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-wrap mt-2.5 gap-1">
              {task?.tags.map((tag) => (
                <Badge
                  className="bg-muted-foreground font-light text-xs"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex">
                {assignedMembers?.map((member) => (
                  <div
                    className="-ml-2 bg-primary/80 rounded-full w-8 h-8 flex justify-center items-center"
                    key={member.id}
                  >
                    {member.photoURL ? (
                      <img
                        className="rounded-full"
                        src={member.photoUrl}
                        alt={member.name}
                      />
                    ) : (
                      <span>{getInitials(member.name)}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <LabelSvg color={getPriorityColor(task?.priority)} />
                <p className="text-muted-foreground text-sm">
                  {calculateDaysUntilDue(task?.dueDate?.seconds) > 0 ? (
                    <span>
                      Faltam {calculateDaysUntilDue(task?.dueDate?.seconds)}{" "}
                      dias
                    </span>
                  ) : calculateDaysUntilDue(task?.dueDate?.seconds) === 0 ? (
                    <span>Entrega hoje</span>
                  ) : (
                    <span>
                      {calculateDaysUntilDue(task?.dueDate?.seconds) * -1} dias
                      de atraso
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

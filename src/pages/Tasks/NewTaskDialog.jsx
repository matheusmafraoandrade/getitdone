import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { DatePickerWithPresets } from "@/components/DatePickerWithPresets";
import Select from "react-select";
import { useFirestore } from "@/hooks/useFirestore";
import { useDocument } from "@/hooks/useDocument";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { arrayUnion } from "firebase/firestore";
import { useToast } from "@/shadcn/components/ui/use-toast";
import { useUserContext } from "@/hooks/useUserContext";
import { useUsersContext } from "@/hooks/useUsersContext";

const priorityOptions = [
  { value: "standby", label: "Em standby" },
  { value: "low", label: "Baixa" },
  { value: "medium", label: "Média" },
  { value: "high", label: "Alta" },
];

export default function NewTaskDialog({ children, open, setOpen }) {
  const { addSubDocument: addTask } = useFirestore("teams");
  const { toast } = useToast();
  const { userDoc } = useUserContext();
  const { users } = useUsersContext();
  const { document: teamDoc } = useDocument("teams", userDoc.teamId);
  const { updateDocument: updateTeam } = useFirestore("teams");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [showNewTagForm, setShowNewTagForm] = useState(false);
  const selectedColumn = localStorage.getItem("selectedColumn") || "backlog";

  const userOptions = users?.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const tagOptions = teamDoc?.tags.map((tag) => ({ value: tag, label: tag }));

  const addNewTag = async (e) => {
    e.preventDefault();
    if (!newTag) return;
    await updateTeam("ykVvTVWMh1EFYsqg2utL", {
      tags: arrayUnion(newTag),
    });
    toast({
      title: "Nova tag",
      description: `Tag "${newTag}" adicionada com sucesso.`,
    });
    setNewTag("");
    setShowNewTagForm(false);
  };

  const getColumn = (status) => {
    switch (status) {
      case "backlog":
        return "column-1";
      case "todo":
        return "column-2";
      case "doing":
        return "column-3";
      case "review":
        return "column-4";
      default:
        return "column-1";
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !dueDate ||
      !priority ||
      assignedMembers.length < 1 ||
      selectedTags.length < 1
    )
      return;

    const { payload: taskId } = await addTask(userDoc.teamId, "tasks", {
      title,
      description,
      tags: selectedTags.map((tag) => tag.value),
      dueDate,
      assignedMembers: assignedMembers.map((member) => member.value),
      status: selectedColumn,
      deleted: false,
      priority,
    });

    const column = getColumn(selectedColumn);

    await updateTeam(userDoc.teamId, {
      [column]: arrayUnion(taskId),
    });

    toast({
      title: "Nova tarefa",
      description: `Tarefa "${title}" adicionada com sucesso.`,
    });
    setTitle("");
    setDescription("");
    setSelectedTags([]);
    setDueDate(null);
    setAssignedMembers([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova tarefa</DialogTitle>
          <DialogDescription>
            Preencha as informações da tarefa:
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24 resize-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="name">Tags</Label>
              <PlusCircledIcon
                className="items-center h-4 w-4 shrink-0 text-foreground/50"
                role="button"
                onClick={() => setShowNewTagForm(true)}
              />
              {showNewTagForm && (
                <form onSubmit={addNewTag}>
                  <Input
                    value={newTag}
                    className="h-6"
                    placeholder="Nova tag..."
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                </form>
              )}
            </div>
            <Select
              isMulti
              options={tagOptions}
              onChange={(options) => setSelectedTags(options)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Data de entrega</Label>
            <DatePickerWithPresets date={dueDate} setDate={setDueDate} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Prioridade</Label>
            <Select
              options={priorityOptions}
              onChange={(option) => setPriority(option.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Responsáveis</Label>
            <Select
              isMulti
              options={userOptions}
              onChange={(options) => setAssignedMembers(options)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={createTask}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

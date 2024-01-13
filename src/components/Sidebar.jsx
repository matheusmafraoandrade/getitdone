import { Button } from "@/shadcn/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  ChatBubbleIcon,
  Cross2Icon,
  DashboardIcon,
  ExitIcon,
  FileTextIcon,
  LightningBoltIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { useLogout } from "@/hooks/useLogout";
import Logo from "./Logo";
import { Separator } from "@/shadcn/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { useAuthContext } from "@/hooks/useAuthContext";
import LabelSvg from "./Label";
import getInitials from "@/utils/getInitials";

const userOptions = [
  {
    route: "/activity",
    name: "Atividade",
    icon: <LightningBoltIcon />,
  },
  {
    route: "/profile",
    name: "Meu perfil",
    icon: <PersonIcon />,
  },
];

const projectOptions = [
  {
    route: "/",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    route: "/tasks",
    name: "Tarefas",
    icon: <FileTextIcon />,
  },
  {
    route: "/chats",
    name: "Conversas",
    icon: <ChatBubbleIcon />,
  },
  {
    route: "/calendar",
    name: "Calendário",
    icon: <CalendarIcon />,
  },
];

const labelOptions = [
  {
    value: "high",
    name: "Prioridade alta",
    icon: <LabelSvg color="red" />,
  },
  {
    value: "medium",
    name: "Prioridade média",
    icon: <LabelSvg color="orange" />,
  },
  {
    value: "low",
    name: "Prioridade baixa",
    icon: <LabelSvg color="yellow" />,
  },
  {
    value: "standby",
    name: "Em standby",
    icon: <LabelSvg color="green" />,
  },
];

export default function Sidebar({
  selectedPriority,
  setSelectedPriority,
  rerender,
}) {
  const navigate = useNavigate();
  const { logout, error, isPending } = useLogout();
  const { user } = useAuthContext();
  console.log("Erros:", error, ", Pendências:", isPending);

  return (
    <nav className="relative overflow-y-auto box-border min-h-[calc(100vh_-_64px)] hidden sm:flex sm:flex-col sm:justify-between h-full w-[240px] bg-accent border border-border">
      <div className="fixed h-[calc(100vh_-_96px)] w-[240px] sm:flex-grow sm:flex sm:flex-col sm:justify-between">
        <div className="px-5 py-3">
          <Logo size="sm" />
        </div>
        <div className="flex gap-3 px-5 py-3">
          <Avatar>
            <AvatarImage src={user.photoURL} />
            <AvatarFallback className="bg-primary/50">
              {getInitials(user.displayName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.displayName}</p>
            <p className="text-muted-foreground/75 text-sm">Premium account</p>
          </div>
        </div>
        {userOptions.map((option) => (
          <div
            key={option.route}
            role="button"
            className="px-5 py-2.5 flex items-center gap-2"
            onClick={() => navigate(option.route)}
          >
            {option.icon}
            <p className="text-sm font-normal">{option.name}</p>
          </div>
        ))}

        <Separator className="my-1" />
        <h2 className="font-semibold text-xl px-5 py-2.5">Projetos</h2>
        {projectOptions.map((option) => (
          <div
            key={option.route}
            role="button"
            className="px-5 py-2 flex items-center gap-2"
            onClick={() => navigate(option.route)}
          >
            {option.icon}
            <p className="text-sm font-normal">{option.name}</p>
          </div>
        ))}

        <Separator className="my-1" />
        <h2 className="font-semibold text-xl px-5 py-2.5">Rótulos</h2>
        {labelOptions.map((option) => (
          <div
            key={option.value}
            role="button"
            className="px-5 py-2 flex items-center justify-between"
          >
            <div
              className="flex gap-3"
              onClick={() => setSelectedPriority(option.value)}
            >
              {option.icon}
              <p
                className={`text-md/90 ${
                  selectedPriority === option.value ? "font-semibold" : ""
                }`}
              >
                {option.name}
              </p>
            </div>
            {option.value === selectedPriority && (
              <Cross2Icon
                role="button"
                onClick={() => setSelectedPriority(null)}
              />
            )}
          </div>
        ))}

        <Separator className="my-1" />
        <div className="px-5 py-1">
          <Button
            size="noPadding"
            variant="ghost"
            onClick={logout}
            className="opacity-75 font-normal py-1.5"
          >
            <QuestionMarkCircledIcon className="w-4 h-4 mr-2" />
            Central de ajuda
          </Button>
          <Button
            size="noPadding"
            variant="ghost"
            onClick={logout}
            className="opacity-75 font-normal py-1"
          >
            <ExitIcon className="w-4 h-4 mr-2" />
            Sair da conta
          </Button>
        </div>
        {rerender && <span className="hidden"></span>}
      </div>
    </nav>
  );
}

import Logo from "./Logo";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

// fixed w-full bg-muted/50 border border-border h-12 flex justify-between items-center px-6

export default function Topbar() {
  return (
    <div className="flex bg-muted/50 justify-between w-full mt-28 px-6">
      <HamburgerMenuIcon className="invisible h-6 w-6" />
      <Logo justify="justify-center" />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HamburgerMenuIcon className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuItem>Atividade</DropdownMenuItem>
          <DropdownMenuItem>Meu perfil</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Projetos</DropdownMenuLabel>
          <DropdownMenuItem>Tarefas</DropdownMenuItem>
          <DropdownMenuItem>Conversas</DropdownMenuItem>
          <DropdownMenuItem>Calendário</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Rótulos</DropdownMenuLabel>
          <DropdownMenuItem>Alta Prioridade</DropdownMenuItem>
          <DropdownMenuItem>Média Prioridade</DropdownMenuItem>
          <DropdownMenuItem>Baixa Prioridade</DropdownMenuItem>
          <DropdownMenuItem>Em Standby</DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

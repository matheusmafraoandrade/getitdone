import { useState } from "react";
import { Button } from "../../shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Link } from "react-router-dom";
import { useSignup } from "@/hooks/useSignup";
import { ReloadIcon } from "@radix-ui/react-icons";
import Logo from "@/components/Logo";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, fullName);
  };

  return (
    <div className="flex gap-20 w-full px-40 py-28">
      <div className="w-1/2 bg-muted rounded-xl p-8">
        <Logo />
        <h2 className="mt-14 text-4xl leading-[50px] font-medium">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </h2>
        <p className="mt-10 text-muted-foreground">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
          assumenda iusto pariatur perferendis, nostrum suscipit quia unde id a
          eius quibusdam aliquam eum illo ut officiis! Expedita sapiente libero
          labore.
        </p>
        <div className="bg-foreground text-background p-8 rounded-xl mt-16 leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi totam
          nostrum fugit aperiam dolorum aspernatur porro assumenda perspiciatis
          autem velit recusandae sapiente officiis ab id maiores similique,
          laudantium minima placeat.
        </div>
      </div>
      <div className="flex flex-col w-1/2 px-20">
        <div>
          <h1 className="text-3xl font-medium">Cadastre-se agora</h1>
          <p className="mt-4 text-muted-foreground font-normal text-lg">
            Crie sua conta agora mesmo
          </p>
          <form className="mt-10" onSubmit={handleSubmit}>
            <p className="text-muted-foreground mb-2.5">Nome completo</p>
            <Input
              type="text"
              autocomplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <p className="mt-5 text-muted-foreground mb-2.5">E-mail</p>
            <Input
              type="email"
              autocomplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="mt-5 text-muted-foreground mb-2.5">Senha</p>
            <Input
              type="password"
              autocomplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              size="xl"
              className="mt-10 text-lg w-full"
              disabled={isPending}
            >
              {isPending && (
                <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />
              )}
              {isPending ? "Criando a conta..." : "Criar minha conta"}
            </Button>
          </form>
          <div className="flex justify-center gap-1 text-base mt-5">
            <p>Já tem uma conta? </p>
            <Link to="/login" className="text-primary">
              Entre agora.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

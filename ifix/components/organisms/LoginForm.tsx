import Button from "../atoms/Button";
import FormField from "../molecules/FormField";

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-3">
      <FormField placeholder="Usuário" />
      <FormField placeholder="Senha" type="password" />
      <Button>Entrar</Button>
    </div>
  );
}
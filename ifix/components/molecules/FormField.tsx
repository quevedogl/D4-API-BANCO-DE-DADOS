import Input from "../atoms/Input";

type Props = {
  placeholder: string;
  type?: string;
};

export default function FormField({ placeholder, type }: Props) {
  return <Input placeholder={placeholder} type={type} />;
}
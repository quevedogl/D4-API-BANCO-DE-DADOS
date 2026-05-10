type Props = {
  placeholder: string;
  type?: string;
};

export default function Input({ placeholder, type = "text" }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full 
        p-3 
        rounded-lg 
        bg-gray-200 
        text-black 
        placeholder-gray-500 
        outline-none 
        focus:ring-2 
        focus:ring-cyan-500
      "
    />
  );
}
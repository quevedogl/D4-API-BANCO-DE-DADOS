type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        bg-cyan-500 
        hover:bg-cyan-600 
        text-white 
        py-3 
        rounded-lg 
        w-full 
        cursor-pointer 
        transition
      "
    >
      {children}
    </button>
  );
}
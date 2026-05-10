import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-cyan-500 text-white text-center py-4 font-bold text-xl">
      <Link href="/" className="cursor-pointer">
        IFix
      </Link>
    </div>
  );
}
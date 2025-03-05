import { LuGithub } from "react-icons/lu";

export default function CreditsHeader() {
  return (
    <a href="https://github.com/SirGhazian/" target="_blank">
      <LuGithub className="absolute z-10 text-[2.5rem] top-4 right-4 hover:bg-black/50 p-2 hover:scale-110 rounded-lg duration-300 transition-all" />
    </a>
  );
}

import { Github, Instagram, Linkedin, Twitter, Plus } from "lucide-react";
import Button from "../ui/button";

export default function UserCard() {
  const icons = [Github, Instagram, Linkedin, Twitter, Plus];

  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48">
        <img
          src="/me.jpeg"
          alt="Gabriel Oliveira"
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            Gabriel Oliveira
          </h3>
        </div>
        <p className="opacity-40">Faço produtos para a internet.</p>
        <div className="flex flex-col gap-2 w-full">
          <span className="uppercase text-xs font-medium">Links</span>
          <div className="flex justify-between">
            {icons.map((Icon, i) => (
              <button
                key={i}
                className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full h-[172px]">
          <div className="h-full flex flex-col items-center gap-3">
            <Button className="w-full">Template Saas - Compre Agora</Button>
            <button className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]">
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

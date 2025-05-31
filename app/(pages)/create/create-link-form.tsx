"use client";

import { createLink } from "@/app/actions/create-link";
import { verifyLink } from "@/app/actions/verify-link";
import Button from "@/app/components/ui/button";
import TextInput from "@/app/components/ui/text-input";
import { sanitizeLink } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function CreateLinkForm() {
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const router = useRouter();

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value));
    setError("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!link) {
      setError("O link não pode ser vazio");
      return;
    }

    if (link.length < 3) {
      setError("O link deve ter pelo menos 3 caracteres");
      return;
    }

    if (link.length > 30) {
      setError("O link deve ter no máximo 30 caracteres");
      return;
    }

    const isLinkTaken = await verifyLink(link);

    if (isLinkTaken) {
      setError("O link já está em uso");
      return;
    }

    const isLinkCreated = await createLink(link);

    if (isLinkCreated) {
      router.push(`/${link}`);
    } else {
      setError("Erro ao criar perfil. Tente novamente.");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-ffull flex items-center gap-2">
        <span className="text-white">projectinbio.com</span>
        <TextInput
          placeholder="seu-nome-de-usuario"
          value={link}
          onChange={handleLinkChange}
        />
        <Button className="w=[126px]">Criar</Button>
      </form>
      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  );
}

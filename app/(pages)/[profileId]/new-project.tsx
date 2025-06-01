"use client";

import { createProject } from "@/app/actions/create-project";
import Button from "@/app/components/ui/button";
import Modal from "@/app/components/ui/modal";
import TextArea from "@/app/components/ui/text-area";
import TextInput from "@/app/components/ui/text-input";
import { compressFile } from "@/app/lib/utils";
import { ArrowUpFromLine, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function NewProject({ profileId }: { profileId: string }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  function triggerImageInput(id: string) {
    document.getElementById(id)?.click();
  }

  function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = URL.createObjectURL(file);
      return url;
    }
    return null;
  }

  function handleCloseModal() {
    setIsOpen(false);
    setProjectImage(null);
    setProjectName("");
    setProjectDescription("");
    setProjectUrl("");
  }

  async function handleCreateProject() {
    setIsCreatingProject(true);

    const imageInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;

    if (!imageInput.files) {
      setIsCreatingProject(false);
      return;
    }

    const compressedFile = await compressFile(Array.from(imageInput.files));

    const formData = new FormData();
    formData.append("file", compressedFile[0]);
    formData.append("profileId", profileId);
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectUrl", projectUrl);

    await createProject(formData);

    startTransition(() => {
      handleCloseModal();
      setIsCreatingProject(false);
      setProjectImage(null);
      setProjectName("");
      setProjectDescription("");
      setProjectUrl("");
      router.refresh();
    });
  }

  return (
    <>
      <Button
        className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border border-dashed border-border-secondary"
        onClick={handleOpenModal}
      >
        <Plus className="size-10 text-accent-green" />
        <span>Novo projeto</span>
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <p className="text-white font-bold text-xl">Novo Projeto</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt="Project image"
                    className="bject-cover object-center"
                  />
                ) : (
                  <button
                    onClick={() => triggerImageInput("imageInput")}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Plus className="size-4" />
                  </button>
                )}
              </div>
              <button
                className="text-white flex items-center gap-2"
                onClick={() => triggerImageInput("imageInput")}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProjectImage(handleImageInput(e))}
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="text-white font-bold">
                  Título do projeto
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="text-white font-bold"
                >
                  Descrição do projeto
                </label>
                <TextArea
                  id="project-description"
                  placeholder="Digite a descrição do projeto"
                  className="h-36 resize-none"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-white font-bold">
                  URL do projeto
                </label>
                <TextInput
                  type="url"
                  id="project-url"
                  placeholder="Digite a URL do projeto"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button onClick={handleCloseModal} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleCreateProject} disabled={isCreatingProject}>
              Criar projeto
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

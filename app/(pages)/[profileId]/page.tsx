import ProjectCard from "@/app/components/commons/project-card";
import { TotalVisits } from "@/app/components/commons/total-visits";
import UserCard from "@/app/components/commons/user-card";
import { auth } from "@/app/lib/auth";
import { getProfile, getProfileProjects } from "@/app/server/get-profile";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewProject from "./new-project";
import { getDownloadUrlFromPath } from "@/app/lib/firebase";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;

  const profile = await getProfile(profileId);

  if (!profile) return notFound();

  const session = await auth();

  const isOwner = session?.user?.id === profile.userId;

  const projects = await getProfileProjects(profileId);

  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
        <span>Você está usando a versão trial</span>
        <Link href={`/${profileId}/upgrade`}>
          <span className="text-accent-green font-bold">
            Faça o upgrade agora!
          </span>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center h-min">
        <UserCard />
      </div>
      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.projectName}
            project={project}
            isOwner={isOwner}
            img={await getDownloadUrlFromPath(project.imagePath)}
          />
        ))}
        {isOwner && <NewProject profileId={profileId} />}
      </div>
      {isOwner && (
        <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
          <TotalVisits />
        </div>
      )}
    </div>
  );
}

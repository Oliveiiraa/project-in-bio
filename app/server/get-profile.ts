import "server-only";

import { db } from "@/app/lib/firebase";

export type Profile = {
  userId: string;
  totalVisits: number;
  createdAt: number;
  updatedAt: number;
};

export type Project = {
  id: string;
  userId: string;
  profileId: string;
  projectName: string;
  projectDescription: string;
  projectUrl: string;
  imagePath: string;
  createdAt: number;
  updatedAt: number;
  totalVisits?: number;
};

export async function getProfile(profileId: string) {
  const profile = await db.collection("profiles").doc(profileId).get();

  return profile.data() as Profile;
}

export async function getProfileProjects(profileId: string) {
  const projects = await db
    .collection("projects")
    .doc(profileId)
    .collection("projects")
    .get();

  return projects.docs.map((doc) => doc.data()) as Project[];
}

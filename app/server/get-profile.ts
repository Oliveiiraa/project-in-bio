import "server-only";

import { db } from "@/app/lib/firebase";

export type Profile = {
  userId: string;
  totalVisits: number;
  createdAt: number;
  updatedAt: number;
};

export async function getProfile(profileId: string) {
  const profile = await db.collection("profiles").doc(profileId).get();

  return profile.data() as Profile;
}

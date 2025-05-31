"use server";

import { db } from "@/app/lib/firebase";

export async function verifyLink(link: string) {
  const linkExists = await db.collection("profiles").doc(link).get();

  return linkExists.exists;
}

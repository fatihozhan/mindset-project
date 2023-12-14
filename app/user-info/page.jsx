import React from "react";
import Content from "./content";
import { getServerSession } from "next-auth";
export const dynamic = "force-dynamic";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function UserInfo() {
  const user = await getServerSession(authOptions);
  return <Content user={user.user} />;
}

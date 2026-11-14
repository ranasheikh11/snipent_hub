import React from "react";
import { CommunityClient } from "./CommunityClient";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CommunityClient id={id} />;
}


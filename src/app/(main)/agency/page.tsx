import { getAuthUserDetails } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await currentUser();
  if (!user) redirect("/agency/sign-in");

  const x = await getAuthUserDetails();

  return <div>Agency Page</div>;
};

export default Page;

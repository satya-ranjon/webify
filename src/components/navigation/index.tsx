import { User } from "@clerk/nextjs/server";
import React from "react";

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  return <div className=" w-full bg-red-300 h-10">Navigation</div>;
};

export default Navigation;

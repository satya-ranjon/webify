import Navigation from "@/components/navigation";
import React from "react";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className="h-full">
        <Navigation user={user} />
        {children}
      </main>
    </ClerkProvider>
  );
};

export default layout;

import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";

const Page = async ({
  searchParams,
}: {
  searchParams: { plan: Plan; state: "string"; code: string };
}) => {
  // const user = await currentUser();
  // if (!user) redirect("/agency/sign-in");

  const agencyId = await verifyAndAcceptInvitation();
  const user = await getAuthUserDetails();

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount");
    }
    if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split("__")[0];
        const stateAgencyId = searchParams.state.split("__")[1];
        if (!stateAgencyId) {
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`;
        }
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <>NOt authorized 404</>;
    }
  }
  const authUser = await currentUser();

  return <div>Agency Page</div>;
};

export default Page;

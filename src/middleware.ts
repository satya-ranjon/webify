import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import path from "path";

export default authMiddleware({
  publicRoutes: ["/site", "/api/uploadthing"],
  //   ignoredRoutes: ["/no-auth-in-this-route"],
  async beforeAuth(_auth, _req) {},
  async afterAuth(_auth, req) {
    const url = req.nextUrl;
    const searchParams = url.searchParams.toString();
    let hostname = req.headers;
    const pathWithSearchParams = `${url.pathname}${
      searchParams.length > 0 ? `?${searchParams}` : ""
    }`;

    // if subdomain is exists
    const customSubdomain = hostname
      .get("host")
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0];

    if (customSubdomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubdomain}${pathWithSearchParams}`, req.url)
      );
    }

    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
    }

    if (
      url.pathname === "/" ||
      (url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)
    ) {
      return NextResponse.rewrite(new URL(`/site`, req.url));
    }

    if (
      url.pathname.startsWith(`/agency`) ||
      url.pathname.startsWith("/subaccount")
    ) {
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

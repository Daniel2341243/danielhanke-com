import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export function proxy(request: Parameters<typeof intl>[0]) {
  return intl(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|images|.*\\..*).*)",
  ],
};

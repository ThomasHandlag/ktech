export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/day13practice/dashboard",
    "/day13practice/dashboard/:path*",
  ],
};

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  // // Store current request url in a custom header, which you can read later
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("x-url", request.url);
  let isAuth = false;
  const cookiesStore = await cookies();
  const authCookie = cookiesStore.get(`${process.env.AUTH_TOKEN_NAME}`);
  const accessToken = authCookie?.value;

  if (accessToken) isAuth = true;

  if (isAuth) {
    if (request.url.includes("/register")) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  }

  if (request.url.includes("/home"))
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
  // return NextResponse.next({
  //   request: {
  //     // Apply new request headers
  //     headers: requestHeaders,
  //   },
  // });
}

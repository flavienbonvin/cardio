import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  if (!context.cookies.get("password") && context.url.pathname !== "/login") {
    return context.redirect("/login");
  }

  if (context.cookies.get("password") && context.url.pathname === "/login") {
    return context.redirect("/");
  }

  return next();
});

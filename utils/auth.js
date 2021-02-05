import cookie from "js-cookie";
import Router from "next/router";

export function handleLogin(token, tokenAdmin, userRole) {
  cookie.set("token", token);
  if (userRole === "admin") {
    cookie.set("tokenAdmin", tokenAdmin);
    Router.push("/admin/products");
  } else {
    Router.push("/account");
  }
}

export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

export function handleLogout() {
  cookie.remove("token");
  cookie.remove("tokenAdmin");
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
}

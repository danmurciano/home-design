import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import Router from "next/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import "../styles/nprogress.css"
import '../styles/globals.css';
import '../styles/styles.css';
import '../styles/styles-admin.css';
import '../styles/styles-navbar.css';
import '../styles/styles-product.css';
import '../styles/styles-cart.css';
import '../styles/styles-account.css';


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    const { tokenAdmin } = parseCookies(ctx);

    let pageProps = {};

    let route;
    if (ctx.pathname.startsWith("/account")) {
      route = "user";
    } else if (ctx.pathname.startsWith("/admin")) {
      route = "admin";
    } else {
      route = "general";
    }

    if (!token) {
      switch(route) {
        case "user":
        redirectUser(ctx, "/login");
        break;
        case "admin":
        redirectUser(ctx, "/login");
        break;
        case "general":
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx);
        }
        break;
      }
    } else {
      if (route === "admin" && !tokenAdmin) {
        redirectUser(ctx, "/login");
      } else {
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx);
        }
        try {
          const payload = { headers: { Authorization: token } };
          const url = `${baseUrl}/api/account`;
          const response = await axios.get(url, payload);
          const user = response.data;
          pageProps.user = user;
        } catch (error) {
          console.error("Error getting current user", error);
          destroyCookie(ctx, "token");
          destroyCookie(ctx, "tokenAdmin");
          redirectUser(ctx, "/login");
        }
      }
    }


    if (!token) {
      pageProps.cartProducts = [];
    } else {
      try {
        const url = `${baseUrl}/api/cart`;
        const payload = { headers: { Authorization: token }};
        const response = await axios.get(url, payload);
        pageProps.cartProducts = response.data;
      } catch (error) {
        console.error("Error getting current user", error);
      }
    }

    return { pageProps };
  }


  componentDidMount() {
    window.addEventListener("storage", this.syncLogout);
  }

  syncLogout = event => {
    if (event.key === "logout") {
      console.log("Logged out from storage");
      Router.push('/login')
    }
  }


  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;

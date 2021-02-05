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

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const protectedRoute = ctx.pathname.startsWith("/account") || ctx.pathname.startsWith("/admin");
      if (protectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        const admin = user.role === "root" || user.role === "admin";
        const adminRoute = ctx.pathname.startsWith("/admin");
        if (adminRoute && !admin) {
          redirectUser(ctx, "/");
        }
        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login");
      }
    }

    if (!token) {
      pageProps.cartProducts = [];
    } else {
      const url = `${baseUrl}/api/cart`;
      const payload = { headers: { Authorization: token }};
      const response = await axios.get(url, payload);
      pageProps.cartProducts = response.data;
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

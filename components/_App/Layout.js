import Head from "next/head";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import HeadContent from "./HeadContent";

function Layout({ children, user, cartProducts }) {
  return (
    <>
      <Head>
        <HeadContent />
        <title>Home Design</title>
      </Head>

      <div class="screen-adjust">
        <div class="wrapper">
          <Header user={user} cartProducts={cartProducts}/>
          <Container fluid>
            {children}
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;

import React from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Image, Icon, Button, Popup, Label } from "semantic-ui-react";
import { Navbar, Nav } from "react-bootstrap";
import CartPopup from "../../components/Cart/CartPopup";
import NProgress from "nprogress";
import { handleLogout } from "../../utils/auth"
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import { parseCookies } from "nookies";
import { calculateCartItems } from "../../utils/calculateCartTotal";
import TopSearchBar from "./TopSearchBar";


Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => {
  NProgress.done();
  window.scrollTo({top: 0})
};
Router.onRouteChangeError = () => NProgress.done();


export default function Header({ user, cartProducts }) {
  const router = useRouter();
  const isAdmin = user && user.role === "admin";
  const cartItems = calculateCartItems(cartProducts);


  function accountMessage() {
    let firstName;
    if (user) {
      firstName = user.name.split(' ').slice(0, 1);
      return `Hi, ${firstName}`;
    } else {
      return "Sign In";
    }
  }


  return (
    <>
    <Navbar collapseOnSelect expand="md" bg="light" variant="light" className="navbar">
      <div className="navbar-brand">
        <a href="/"> <img class="logo" src="/images/logo.png"/> </a>
      </div>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle-button"/>
      <Navbar.Collapse id="responsive-navbar-nav" className="navbar-collapse">

      <div class="col">
        <div class="search-div">
          <TopSearchBar/>
        </div>
      </div>

      <Nav className="ml-auto" >

        <Nav.Link href="/admin/products" className={isAdmin ? "nav-item" : "cart-hide"} >
          <Icon size="large" name="edit" className="nav-icon-edit"/>
          <p class="nav-text">Edit</p>
        </Nav.Link>

        <Nav.Link href="/products" className="nav-item">
          <Icon size="large" name="list layout" className="nav-icon"/>
          <p class="nav-text">Products</p>
        </Nav.Link>

        {user ? (
          <>
            <Popup
              className="logOutPopup"
              hoverable
              flowing
              position="bottom right"
              offset={[-30, 0]}
              content= {
                <>
                <p style={{ fontSize: "10px", marginBottom: "0" }}> Signed in as </p>
                <p class="styled-font-md" style={{ fontSize: "16px", marginTop: "0" }}> { user.name } </p>
                <Button
                  circular
                  color="instagram"
                  onClick={handleLogout}
                  content="Sign Out"
                />
                </>
              }
              trigger= {
                <Nav.Link href="/account" className="nav-item" >
                  <Icon name="user circle" size="large" className="nav-icon"/>
                  <p class="nav-text">{accountMessage()}</p>
                </Nav.Link>
              }
            />

            <Popup
              flowing
              hoverable
              position="bottom right"
              offset={[-30, 0]}
              content= {
                <CartPopup
                  user={user}
                  products={cartProducts}
                />
              }
              trigger= {
                <Nav.Link href="/cart" className={isAdmin ? "cart-hide" : "nav-item"} >
                  <Icon name="cart" size="large" className="nav-icon-cart"/>
                  <Label className="cartLabel" size="tiny" circular>
                    {cartItems}
                  </Label>
                  <p class="cart-text">Cart</p>
                </Nav.Link>
              }
            />
          </>

        ) : (

          <>
            <Nav.Link href="/login" className="nav-item" >
              <Icon name="user circle" size="large" className="nav-icon"/>
              <p class="nav-text">{accountMessage()}</p>
            </Nav.Link>
          </>
        )}

      </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>

  );
}

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

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => {
  NProgress.done();
  window.scrollTo({top: 0})
};
Router.onRouteChangeError = () => NProgress.done();


export default function Header({ user, cartProducts }) {
  const router = useRouter();
  const isRoot = user && user.role === "root";
  const isAdmin = user && user.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin;
  const cartItems = calculateCartItems(cartProducts);


  function accountMessage() {
    let firstName
    if (user) {
      firstName = user.name.split(' ').slice(0, 1);
      return `Hello, ${firstName}`;
    } else {
      return "Sign In";
    }
  }


  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Navbar.Brand href="/" className="navbar-brand"> Home Design </Navbar.Brand>

      <div class="toggle-button-div">
        <Navbar.Toggle className="toggle-button" aria-controls="basic-navbar-nav"/>
      </div>

       <Navbar.Collapse className="navbar-sticky row" id="basic-navbar-nav">
         <Nav className="ml-auto " >
           <div class="col-lg col-md-12"/>

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
                     color="instagram"
                     onClick={handleLogout}
                     content="Sign Out"
                   />
                   </>
                 }
                 trigger= {
                   <Nav.Link href="/account" className="nav-item" >
                     <Icon name="user" size="large"/>
                     <p class="navText">Account</p>
                     <p class="accountNote">{accountMessage()}</p>
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
                     <Label className="pseudoLabel" size="tiny" circular>
                       {cartItems}
                     </Label>
                     <Icon name="cart" size="large"/>
                     <Label className="cartLabel" size="tiny" circular>
                       {cartItems}
                     </Label>
                     <p class="navText">Cart</p>
                   </Nav.Link>
                 }
               />
             </>

           ) : (

             <>
               <Nav.Link href="/login" className="nav-item" >
                 <Icon name="user" size="large"/>
                 <p class="navText">Account</p>
                 <p class="accountNote">{accountMessage()}</p>
               </Nav.Link>

               <Nav.Link href="/cart" className="cart-hide" >
                 <Icon name="cart" size="large"/>
                 <p class="navText">Cart</p>
               </Nav.Link>
             </>

           )}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>

  );
}

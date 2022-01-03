import React from "react";
import { useRouter } from "next/router";
import axios from "axios";


export default function Home({ user }) {

  return (
    <div class="container-fluid pageMain">
      <h1> Welcome to Home Design </h1>
      <div class="row home-image">
        <div class="col-lg-9 col-md-12 home-image-left" />
        <div class="col-lg-3 col-md-12 home-image-right">
          <h2> Find Your Inspiration </h2>
        </div>
      </div>
    </div>
  );
}

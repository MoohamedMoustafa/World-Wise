import React from "react";
import PageNav from "../components/PageNav/PageNav";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <PageNav />
      <h1>WorldWise</h1>
      <Link to="/app">App</Link>
    </div>
  );
}

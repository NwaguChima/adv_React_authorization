import React from "react";
import { Link } from "react-router-dom";

const Guides = () => {
  return (
    <section>
      <h1>Guides Page</h1>
      <br />
      <p>You must have been assigned a Guides role.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Guides;

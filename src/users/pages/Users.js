import React, { useContext } from "react";
import Header from "../../shared/Header";
import Information from "../../shared/Information";
import { AuthContext } from "../../shared/context/auth-context";

import UsersList from "../components/UsersList";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const Users = () => {
  const title = () => {
    if (auth.isLoggedIn) {
      return `Welcome to Book-face  ${auth.name}`;
    } else {
      return "Welcome to Book-face";
    }
  };
  const auth = useContext(AuthContext);
  return (
    <div>
      <Header
        title={title()}
        description={
          !auth.isLoggedIn
            ? "Join the community and start sharing books you love"
            : null
        }
      >
        {!auth.isLoggedIn ? (
          <NavLink
            style={{ marginTop: "40px", color: "#272727" }}
            className="cta cta-personal"
            to="/auth"
          >
            Create an account
          </NavLink>
        ) : (
          <NavLink
            style={{ marginTop: "40px", color: "#272727" }}
            className="cta cta-personal"
            to={`/${auth.userId}`}
          >
            My account
          </NavLink>
        )}
      </Header>
      <Information />

      <UsersList />
    </div>
  );
};

export default Users;

import React, { useContext, useState } from "react";
import { AuthContext } from "../shared/context/auth-context";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./TheNav.scss";

import NavDropdown from "react-bootstrap/NavDropdown";

const TheNav = () => {
  const [expanded, setExpanded] = useState(false);

  const auth = useContext(AuthContext);
  return (
    <Navbar expand="lg" style={{ padding: ".2rem 1rem" }} expanded={expanded}>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(expanded ? false : "expanded")}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" style={{ width: "100%" }}>
          <NavLink
            onClick={() => setExpanded(false)}
            to="/"
            exact
            activeStyle={{
              fontWeight: "bold",
              color: "#272727",
            }}
            className="nav-link"
          >
            Users
          </NavLink>
          <NavLink
            onClick={() => setExpanded(false)}
            to="/books"
            exact
            activeStyle={{
              fontWeight: "bold",
              color: "#272727",
            }}
            className="nav-link"
          >
            Books
          </NavLink>
          {auth.isLoggedIn && (
            <NavLink
              onClick={() => setExpanded(false)}
              to={`/${auth.userId}`}
              exact
              activeStyle={{
                fontWeight: "bold",
                color: "#272727",
              }}
              className="nav-link"
            >
              My account
            </NavLink>
          )}
          {auth.isLoggedIn && (
            <NavLink
              onClick={() => setExpanded(false)}
              to="/books/new"
              exact
              activeStyle={{
                fontWeight: "bold",
                color: "#272727",
              }}
              className="nav-link"
            >
              Create new book
            </NavLink>
          )}

          {!auth.isLoggedIn ? (
            <NavLink
              onClick={() => setExpanded(false)}
              to="/auth"
              exact
              activeStyle={{
                fontWeight: "bold",
                color: "#272727",
              }}
              className="nav-link login"
            >
              Log-in
            </NavLink>
          ) : (
            <NavLink
              onClick={() => setExpanded(false)}
              to="/"
              className="nav-link login"
              onClick={() => {
                auth.logout();
              }}
            >
              Log-out
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TheNav;

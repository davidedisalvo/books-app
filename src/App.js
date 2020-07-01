import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import TheNav from "./shared/TheNav";
import Users from "./users/pages/Users";
import Books from "./books/pages/Books";
import SingleUser from "./users/pages/SingleUser";
import SingleBook from "./books/pages/SingleBook";
import Footer from "./shared/Footer";

import Auth from "./users/pages/Auth";
import Test from "./users/pages/Auth-test";

import NewBook from "./users/pages/NewBook";
import { AuthContext } from "./shared/context/auth-context";

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [name, setName] = useState(false);

  const login = useCallback((uid, token, name, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setName(name);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //one hour expire session
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        name: name,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setName(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.name,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (!token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/books" exact component={Books} />

        <Route path="/:uid" exact component={SingleUser} />
        <Route path="/books/:bid" exact component={SingleBook} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/books/new" exact component={NewBook} />

        <Route path="/" exact component={Users} />
        <Route path="/auth" exact component={Auth} />

        <Route path="/books" exact component={Books} />

        <Route path="/books/:bid" exact component={SingleBook} />
        <Route path="/:uid" exact component={SingleUser} />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        name: name,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <TheNav />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

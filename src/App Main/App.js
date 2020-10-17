import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Authentication/Home";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import { AuthProvider } from "../Authentication/Auth";
import PrivateRoute from "../Authentication/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

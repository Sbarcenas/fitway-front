import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import { UserProvider, useUser } from "./context/userContext";
import Register from "./screens/Register";
import { NotificationContainer } from "react-notifications";
import Dashboard from "./screens/Dashboard";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isLoading } = useUser();

  return (
    <Route
      {...rest}
      render={props => {
        if (!isLoading) {
          if (user) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        } else {
          return (
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <p>Cargando...</p>
            </div>
          );
        }
      }}
    />
  );
};

const OnlyAdminRoute = ({ component: Component, ...rest }) => {
  const { user, isLoading } = useUser();
  const userRol = ((user || {}).user || {}).rol;
  return (
    <Route
      {...rest}
      render={props => {
        if (!isLoading) {
          if (userRol === "admin") {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/home", state: { from: props.location } }}
              />
            );
          }
        } else {
          return (
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <p>Cargando...</p>
            </div>
          );
        }
      }}
    />
  );
};

function App() {
  return (
    <UserProvider>
      <NotificationContainer />
      <Router>
        <Switch>
          <Route path={["/login"]} component={Login} />
          <Route path={["/register"]} component={Register} />
          <OnlyAdminRoute path={"/dashboard"} component={Dashboard} />
          <PrivateRoute
            path={["/home", "/home/:section", "/"]}
            component={Home}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;

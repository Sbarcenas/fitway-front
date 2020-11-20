import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField
} from "@material-ui/core";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { login, logout } from "../services/fitway-api";
import { NotificationManager } from "react-notifications";

const useStyle = makeStyles({
  container: {
    height: "100vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  logo: { width: 100, height: "auto", alignSelf: "center" },
  textField: {
    margin: "5px 0",
    width: "100%"
  }
});

function Login(props) {
  const history = useHistory();
  async function loginUser(data) {
    try {
      await logout();
      await login(data);
      NotificationManager.success(
        "Disfrute de las mejor atención virtual del pais",
        "Bienvenido"
      );
      history.push("./Dashboard");
    } catch (e) {
      NotificationManager.error(e.message, "Login fallido", 5000, () => {
        return null;
      });
    }
  }
  const classes = useStyle();
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={loginUser}
    >
      {({ handleChange, handleSubmit, values, setFieldValue, errors }) => (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={12} sm={8} md={4} style={{ alignSelf: "center" }}>
            <div className={classes.container}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Grid container alignItems="center" direction="column">
                    <Logo className={classes.logo} />
                    <Typography variant="h5" component="h2">
                      Fitway
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="p"
                      align="center"
                    >
                      The best FastFood stablishment around city...
                    </Typography>
                    <Grid item col={12} style={{ marginTop: 15 }}>
                      <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Email"
                        type={"email"}
                        onChange={({ target }) =>
                          setFieldValue("email", target.value)
                        }
                      />
                      <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Password"
                        type={"password"}
                        onChange={({ target }) =>
                          setFieldValue("password", target.value)
                        }
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions disableSpacing>
                  <Grid container direction="column" alignItems={"center"}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                    <Link to="/register">
                      <Button color="default">Register</Button>
                    </Link>
                  </Grid>
                </CardActions>
              </Card>
            </div>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}

export default Login;

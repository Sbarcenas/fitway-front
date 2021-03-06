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
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { Formik } from "formik";
import { Link, Redirect, useHistory } from "react-router-dom";
import { login, categories } from "../../../services/fitway-api/";
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

function clean(obj) {
  for (let propName in obj) {
    if (!obj[propName]) {
      delete obj[propName];
    }
  }
}

function Register({ handleClose, current, handleEdit }) {
  const classes = useStyle();
  const history = useHistory();
  async function patchCurrent({ ...data }) {
    const send = clean(data);
    console.log(data);
    try {
      await categories.patch(current.id, { ...data });
      await login({ email: data.email, password: data.password });
      NotificationManager.success(
        "Usuario actualizado con exito",
        "Actualización exitosa"
      );
      handleEdit();
      handleClose();
    } catch (e) {
      NotificationManager.error(
        e.message,
        "Actualización fallida fallido",
        5000,
        () => {
          return null;
        }
      );
    }
  }

  return (
    <Formik
      initialValues={{
        first_name: current.first_name,
        last_name: current.last_name,
        email: current.email,
      }}
      onSubmit={patchCurrent}
      enableReinitialize
    >
      {({ handleChange, handleSubmit, values, setFieldValue, errors }) => {
        return (
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
                          value={values.first_name}
                          className={classes.textField}
                          variant="outlined"
                          label="First Name"
                          onChange={({ target }) =>
                            setFieldValue("first_name", target.value)
                          }
                        />
                        <TextField
                          value={values.last_name}
                          className={classes.textField}
                          variant="outlined"
                          label="Last Name"
                          onChange={({ target }) =>
                            setFieldValue("last_name", target.value)
                          }
                        />
                        <TextField
                          value={values.email}
                          className={classes.textField}
                          variant="outlined"
                          label="Email"
                          onChange={({ target }) =>
                            setFieldValue("email", target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Grid
                      container
                      direction="column"
                      alignItems={"center"}
                      style={{ marginBottom: 10 }}
                    >
                      <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        style={{ minWidth: 150, marginBottom: 5 }}
                      >
                        Guardar
                      </Button>
                      <Button
                        onClick={handleClose}
                        style={{ textDecoration: "underline" }}
                        to="/login"
                      >
                        Cancelar
                      </Button>
                    </Grid>
                  </CardActions>
                </Card>
              </div>
            </Grid>
          </Grid>
        );
      }}
    </Formik>
  );
}

export default Register;

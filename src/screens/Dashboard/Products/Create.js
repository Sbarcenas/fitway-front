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
import { Link, useHistory } from "react-router-dom";
import { login, products } from "../../../services/fitway-api/";
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

function Create({ handleClose, handleEdit }) {
  const classes = useStyle();
  const history = useHistory();
  async function registerUser({ confirmPassword, ...data }) {
    try {
      await products.create({ ...data });
      await login({ email: data.email, password: data.password });
      NotificationManager.success(
        "Usuario registrado con exito",
        "Registro exitoso"
      );

      handleEdit();
      handleClose();
    } catch (e) {
      NotificationManager.error(e.message, "Registro fallido", 5000, () => {
        return null;
      });
    }
  }

  return (
    <Formik
      initialValues={{
        category_id: null,
        name: "",
        description: "",
        price: ""
      }}
      onSubmit={registerUser}
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
                          className={classes.textField}
                          variant="outlined"
                          label="Category"
                          onChange={({ target }) =>
                            setFieldValue("category_id", target.value)
                          }
                        />
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          label="Name"
                          onChange={({ target }) =>
                            setFieldValue("name", target.value)
                          }
                        />
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          label="Description"
                          onChange={({ target }) =>
                            setFieldValue("description", target.value)
                          }
                        />
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          label="Price"
                          type={"number"}
                          onChange={({ target }) =>
                            setFieldValue("price", target.value)
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
                        Create
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

export default Create;

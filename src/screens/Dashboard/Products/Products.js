import React, { useEffect, useState } from "react";
import { products } from "../../../services/fitway-api";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Edit from "./Edit";
import { NotificationManager } from "react-notifications";
import Create from "./Create";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    margin: "30px 0"
  }
});

function Products(props) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);

  const [current, setCurrent] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  function toggleModal(item) {
    setOpen(!open);
    setCurrent(item);
  }
  function toggleCreate() {
    setOpenCreate(!openCreate);
  }
  async function getData() {
    try {
      const { data } = await products.find();
      setItems(data);
    } catch (e) {
      console.info(e);
    }
  }

  async function removeData(item) {
    setIsLoading(true);
    try {
      await products.remove(item.id);
      await getData();
      NotificationManager.success(
        "Usuario Eliminado con exito",
        "Actualización exitosa"
      );
    } catch (e) {
      NotificationManager.error(
        e.message,
        "Actualización de usuario fallida",
        5000,
        () => {
          return null;
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        height="100%"
      >
        <Grid item xs={12} sm={10} md={8} style={{ alignSelf: "center" }}>
          <Typography variant={"h3"} className={classes.title}>
            Products
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      onClick={toggleCreate}
                    >
                      Añadir
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(row => (
                  <TableRow key={row.id + "-" + row.first_name}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.category_id}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => toggleModal(row)}>
                        <EditIcon color={"primary"} />
                      </IconButton>
                      <IconButton onClick={() => removeData(row)}>
                        <DeleteIcon color={"secondary"} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Modal open={open} onClose={toggleModal}>
        <Edit
          handleClose={toggleModal}
          current={current}
          handleEdit={getData}
        />
      </Modal>

      <Modal open={openCreate} onClose={toggleCreate}>
        <Create handleClose={toggleCreate} handleEdit={getData} />
      </Modal>
    </div>
  );
}

export default Products;

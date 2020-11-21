import React, { useState, Fragment } from "react";
import axiosUser from "../../config/axiosUser";
import Swal from "sweetalert2";
import Producto from "../compra/Producto";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  containerForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Venta = (props) => {
  const classes = useStyles();

  const [productos, setProductos] = useState({
    products: [],
    totalProducts: "",
    total: "",
  });

  const [valor, setValor] = useState({
    sku: "",
  });

  const [newCant, setNewCant] = useState({
    cant: "0",
  });

  const { sku } = valor;
  const { products } = productos;

  const handleValue = (e) => {
    setValor({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    findProduct(sku);
  };

  const guardarVenta = () => {
    updateStock();
    axiosUser.post("/sold/", productos).then((res) => {
      if (res.status === 200) {
        Swal.fire("Venta realizada con exito", "", "success");
        setProductos({ products: [] });
      }
    });
  };

  const findProduct = (sku) => {
    axiosUser.get(`/getProduct/${sku}`).then((res) => {
      if (res.data) {
        let exist = false;
        let producto = res.data;
        products.forEach((Element) => {
          if (Element.sku === producto.sku) {
            exist = true;
          }
          if (Element.cant < Element.stock && exist) {
            Element.cant += 1;
          }
        });

        if (exist === false && producto.stock > 0) {
          producto.cant = 1;
          products.push(producto);
        }

        if (producto.stock <= 0) {
          Swal.fire(
            "Agregar Producto",
            "Se acabado el stocks del producto",
            "error"
          );
        }
        setProductos({
          products: products,
          totalProducts: countProducts(),
          total: totalPrice(),
        });
      } else {
        Swal.fire(
          "Producto no encontrado",
          `El sku ${sku} no esta registrado en el sistema`,
          "error"
        );
      }
    });
  };

  const removeItem = (index) => {
    products.splice(index, 1);
    setProductos({ products: products });
  };

  const updateStock = () => {
    productos.products.forEach((Element) => {
      let { _id } = Element;
      let { cant } = Element;
      Element.stock -= cant;
      axiosUser.put(`/products/${_id}`, Element).then((res) => {
        if (res.data.message) {
          console.log("Stock Actualizado");
        }
      });
    });
  };

  const totalPrice = () => {
    let total = 0;
    productos.products.forEach((Element) => {
      let price = Element.price * Element.cant;
      total = price + total;
    });
    return total;
  };

  const deleteAll = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Se eliminaran los productos encontrados",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si estoy seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          "Limpiar Venta",
          "Se eliminaron todos los productos con exito",
          "success"
        );
        setProductos({ products: [] });
      }
    });
  };

  const countProducts = () => {
    let totalProducts = "";
    products.forEach((product) => {
      totalProducts += product.cant;
    });
    return totalProducts;
  };

  const renderProducts = () => {
    return productos.products.map((data, index) => (
      <Producto
        index={index}
        id={data.id}
        sku={data.sku}
        name={data.name}
        description={data.description}
        stock={data.stock}
        price={data.price}
        importe={data.price * data.cant}
        cant={data.cant}
        onRemove={removeItem}
        client={data.client}
        totalProductos={countProducts()}
        handleChangeCant={handleChangeCant}
        handleSubmitCant={handleSubmitCant}
      />
    ));
  };

  const handleChangeCant = (e) => {
    setNewCant({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCant = (e, index) => {
    e.preventDefault();
    newCantFunction(index);
  };

  const newCantFunction = (index) => {
    products[index].cant = newCant.cant;
    if (products[index].cant < products[index].stock) {
      setProductos({
        products: products,
      });
    }

    if (products[index].cant <= 0) {
      alert("no hay stock");
      products[index].cant = 1;
      setProductos({
        products: products,
      });
    }
  };

  console.log(products);

  return (
    <Fragment>
      <div className={classes.containerForm}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            name="sku"
            label="Codigo de Producto"
            variant="outlined"
            onChange={handleValue}
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SearchIcon />}
            disabled={sku === ""}
          >
            Buscar
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            endIcon={<SaveIcon />}
            disabled={!productos.products.length > 0}
            onClick={guardarVenta}
          >
            Cerrar Venta
          </Button>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<DeleteIcon />}
            onClick={deleteAll}
            disabled={!productos.products.length > 0}
          >
            Borrar Todo
          </Button>
        </form>
        <Typography variant="body1">
          Productos agregados: {countProducts()}
        </Typography>
      </div>
      <div className={classes.container}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  Detalles
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Importe</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderProducts()}
              <TableRow>
                <TableCell rowSpan={4} />
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell align="right">
                  {totalPrice() === 0 ? "" : totalPrice()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Fragment>
  );
};

export default Venta;

import React, { useState } from "react";
import axiosUser from "../../config/axiosUser";
import Swal from "sweetalert2";
import Producto from "../compra/Producto";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700,
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

  const disableSold = () => {
    if (productos.products.length === 0) {
      return true;
    } else if (productos.products.length > 0) {
      return false;
    }
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
    let totalProducts = 0;
    products.forEach((product) => {
      totalProducts += product.cant;
    });
    return totalProducts;
  };

  const renderProducts = () => {
    return (
      productos.products.map((data, index) => (
        <Producto
          index={index}
          id={data.id}
          sku={data.sku}
          name={data.name}
          description={data.description}
          stock={data.stock}
          price={data.price}
          importe={data.importe}
          cant={data.cant}
          onRemove={removeItem}
          totalProductos={countProducts()}
        />
      ))
    )
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableRow>
          <TableCell rowSpan={3} />
          <TableCell colSpan={2}>Subtotal</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Tax</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
        <TableBody>
          {
            renderProducts()
          }
        </TableBody>
      </Table>
    </TableContainer >
  );
};

export default Venta;

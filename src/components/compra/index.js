import React, { useState } from "react";
import axiosUser from "../../config/axiosUser";
import Swal from "sweetalert2";
import Producto from "../compra/Producto";

const Venta = (props) => {
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
            exist = true;
          }
        });

        if (exist === false && producto.stock > 0) {
          producto.cant = 1;
          products.push(producto);
        }

        if (producto.stock <= 0) {
          Swal.fire(
            "Agregar Producto",
            "Se acabado el stock del producto",
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

  const renderProductos = () => {
    return (
      <tbody>
        {productos.products.map((producto, index) => (
          <Producto
            index={index}
            key={index}
            id={producto._id}
            sku={producto.sku}
            name={producto.name}
            description={producto.description}
            stock={producto.stock}
            price={producto.price}
            cant={producto.cant}
            importe={producto.price * producto.cant}
            client={producto.client}
            onRemove={removeItem}
          />
        ))}
      </tbody>
    );
  };

  return (
    <div className="container">
      <h4 className="display-4 text-center ">Ventas</h4>
      <div className="card bg-dark text-white ">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-5">
                <input
                  type="text"
                  className="form-control"
                  name="sku"
                  placeholder="Código de Producto"
                  onChange={handleValue}
                />
              </div>
              <div className="form-group col-md-7">
                <button type="submit" className="btn btn-primary">
                  Buscar
                </button>
              </div>
            </div>
          </form>
          <table className="table table-striped table-hover text-center table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">sku</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Producto</th>
                <th scope="col">Descripción</th>
                <th scope="col">Piezas Disponibles</th>
                <th scope="col">Precio</th>
                <th scope="col">Importe</th>
                <th scope="col">Modificar</th>
              </tr>
            </thead>
            {renderProductos()}
          </table>
          <p
            className="text-right"
            style={{ fontSize: 35 + "px", color: "red" }}
          >
            Total a Pagar : ${totalPrice()}
          </p>
          <button
            onClick={() => {
              guardarVenta();
            }}
            type="button"
            className="btn btn-primary mr-sm-2"
            disabled={disableSold()}
          >
            Cobrar
          </button>
          <button
            className="btn btn-danger mr-sm-3"
            onClick={() => deleteAll()}
            disabled={disableSold()}
          >
            Borrar todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Venta;

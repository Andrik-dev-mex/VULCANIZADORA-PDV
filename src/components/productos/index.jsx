import React, { useState, useEffect } from "react";

import axiosUser from "../../config/axiosUser";
import Producto from './Producto';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Productos = () => {

  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    const response = await axiosUser.get('/products/');
    console.log(response.data)
    setProductos(response.data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "Un producto no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        deleteProduct(id);
      }
    })
  };

  const deleteProduct = (id) => {
    axiosUser.delete(`/products/${id}`)
      .then(res => {
        console.log(res);
        if (res.status !== 200) {
          Swal.fire(
            'Eliminar Producto',
            'Error al eliminar',
            'error'
          )
        } else {
          Swal.fire(
            'Eliminado',
            'Producto eliminado con exito',
            'success'
          )
        }
        getProductos();
      });
  }

  useEffect(() => {
    getProductos();
  }, []);

  const renderProductos = () => {
    return (
      <tbody>
        {
          productos.map((producto, index) => (
            <Producto
              key={index}
              index={index}
              id={producto._id}
              sku={producto.sku}
              name={producto.name}
              description={producto.description}
              price={producto.price}
              stock={producto.stock}
              onDelete={handleDelete}
            />
          ))
        }
      </tbody>
    )
  };


  return (
    <div className="container">
      <h4 className="display-4 text-center">
        Gestionar Inventario
      </h4>
      <div className="card bg-dark">
        <div className="card-body">
          <table className="table table-striped table-hover text-center table-dark">
            <thead>
              <th scope = "col">#</th>
              <th scope = "col">Codigo</th>
              <th scope = "col">Producto</th>
              <th scope = "col">Descripcion</th>
              <th scope = "col">Costo</th>
              <th scope = "col">Existencias</th>
              <th scope = "col">Acciones</th>
            </thead>
            {renderProductos()}
          </table>
          <Link to={"/agregarProducto/"} className="btn btn-primary float-right" >
            Nuevo Producto
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Productos;

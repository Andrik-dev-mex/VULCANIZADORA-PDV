import React, { useEffect, useState } from 'react';
import AxiosUser from '../../config/axiosUser';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditarProducto = (props) => {
  const { id } = props.match.params;
  console.log(id);

  const [producto, setProducto] = useState({
    sku: '',
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  const handleSumit = (e) => {
    e.preventDefault();
    guardarProducto();
  };

  const guardarProducto = () => {
    AxiosUser.put(`/products/${id}`, producto)
      .then(res => {
        if (res.data.code === 11000) {
          Swal.fire(
            'Editar Producto',
            `Ya existe un producto con el sku ${producto.sku}`,
            'error'
          )
        } else {
          Swal.fire(
            'Editar Producto',
            `${producto.sku} editado con exito`,
            'success'
          )
          props.history.push('/inventario');
        }
      });

  };

  useEffect(() => {
    const getProducto = () => {
      AxiosUser.get(`/products/${id}`)
        .then(res => {
          console.log(res.data);
          if (res.data.name) {
            setProducto(res.data);
          } else {
            alert('No se ha encontrado el producto');
          }
        });
    };

    getProducto();
  }, [id]);

  return (
    <div className="container">
      <h4 className = "display-4 text-center">Editar Producto</h4>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <form
            className="form"
            onSubmit={handleSumit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="sku"
                  className="mr-sm-2">sku</label>
                <input
                  type="text"
                  className="form-control mr-sm-2"
                  name="sku"
                  placeholder="Codigo de Producto"
                  defaultValue={producto.sku}
                  onChange={handleChange}
                  required />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="name"
                  className="mr-sm-2">Nombre:</label>
                <input
                  type="text"
                  className="form-control mr-sm-2"
                  name="name"
                  placeholder="Nombre del Producto"
                  defaultValue={producto.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="description"
                  className="mr-sm-2">Descripcion</label>
                <input
                  type="text"
                  className="form-control mr-sm-2"
                  name="description"
                  placeholder="Breve descripcion"
                  defaultValue={producto.description}
                  onChange={handleChange}
                  required />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="price"
                  className="mr-sm-2">Precio:</label>
                <input
                  type="number"
                  className="form-control mr-sm-2"
                  name="price"
                  min='1'
                  max='10000000'
                  placeholder="Precio del Producto"
                  defaultValue={producto.price}
                  onChange={handleChange}
                  required />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="stock" className="mr-sm-2">Stock</label>
                <input
                  type="text"
                  className="form-control mr-sm-2"
                  name="stock"
                  placeholder="Unidades a agregar"
                  defaultValue={producto.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">

              </div>
              <div className="form-group col-md-4">
                <button type="submit" className="btn btn-primary btn-block">Guardar Producto</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default withRouter(EditarProducto);
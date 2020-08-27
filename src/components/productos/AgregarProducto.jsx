import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axiosUser from '../../config/axiosUser';
import Swal from 'sweetalert2';


const AgregarProducto = (props) => {

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
    axiosUser.post('/products/', producto)
      .then(res => {
        console.log(res.data);
        if(res.data.code === 11000){
          Swal.fire(
            'Agregar Producto',
            'No pueden existir dos productos con sku igual',
            'error'
          );
        } else {
          Swal.fire(
            'Agregar Producto',
            'Producto Agregado Correctamente',
            'success'
          );
          props.history.push('/inventario/');
        }
      })
      };

    return (
     
        <div className="container">
          <h4 className = "display-4 text-center">Agregar Nuevo Producto</h4>
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
                    <button type="submit" className="btn btn-primary btn-block">Agregar Producto</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    )
  };

export default withRouter(AgregarProducto);
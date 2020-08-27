import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axiosUser from '../../config/axiosUser';
import Swal from 'sweetalert2';

const EditarUsuario = (props) => {
  const { id } = props.match.params;

  const [usuario, setUsuario] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    job: '',
    salary: ''
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const handleSumit = (e) => {
    e.preventDefault();
    guardarUsuario();
  };

  const guardarUsuario = () => {
    axiosUser.put(`/updateUser/${id}`, usuario)
      .then(res => {
        if (res.data.code === 11000) {
          Swal.fire(
            'Editar Usuario',
            `Ya existe un cliente con el correo ${usuario.email}`,
            'error'
          )
        } else {
          Swal.fire(
            'Editar Usuario',
            res.data.message,
            'success'
          )
          props.history.push('/usuarios');
        }
      });

  };

  useEffect(() => {
    const getUsuario = () => {
      axiosUser.get(`/getUser/${id}`)
        .then(res => {
          if (res.data.name) {
            setUsuario(res.data);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Hubo un Problema',
              text: 'No se encontro el cliente solicitado',
              footer: 'Vuelva a intentarlo'
            })
          }
        });
    };

    getUsuario();
  }, [id]);

  return (
    <div className="container">
      <div className="card mt-2 bg-dark text-white">
        <div className="card-body">
          <form className="form"
            onSubmit={handleSumit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="email"
                  className="mr-sm-2">Correo Electronico:</label>
                <input
                  type="email"
                  className="form-control mr-sm-2"
                  name="email"
                  placeholder="Introduce tu correo electronico"
                  defaultValue={usuario.email}
                  onChange={handleChange}
                  required />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="password"
                  className="mr-sm-2">Contrasena:</label>
                <input
                  type="password"
                  className="form-control mr-sm-2"
                  name="password"
                  placeholder="Introduce tu contrasena"
                  defaultValue={usuario.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label
                  htmlFor="name"
                  className="mr-sm-2">Nombre:</label>
                <input
                  type="text"
                  className="form-control mr-sm-2"
                  name="name"
                  placeholder="Introduce tu nombre"
                  defaultValue={usuario.name}
                  onChange={handleChange}
                  required />
              </div>
              <div className="form-group col-md-3">
                <label
                  htmlFor="lastname"
                  className="mr-sm-2">Apellidos:</label>
                <input
                  type="text"
                  className="form-control mr-sm-2"
                  name="lastname"
                  placeholder="Introduce tus Apellidos"
                  defaultValue={usuario.lastname}
                  onChange={handleChange}
                  required />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="job" className="mr-sm-2">Puesto:</label>
                <select
                  className="form-control"
                  name="job"
                  defaultValue={usuario.job}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    ...
                  </option>
                  <option
                    value="Administrador">Administrador
                  </option>
                  <option
                    value="Empleado de Mostrador">Empleado de Mostrador
                  </option>
                  <option
                    value="Vendedor">Vendedor
                  </option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="salary" className="mr-sm-2">Salario:</label>
                <input
                  type="text"
                  className="form-control mr-sm-2"
                  name="salary"
                  placeholder="Introduce su salario"
                  defaultValue={usuario.salary}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">

              </div>
              <div className="form-group col-md-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-block">Editar Usuario </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
};

export default withRouter(EditarUsuario);


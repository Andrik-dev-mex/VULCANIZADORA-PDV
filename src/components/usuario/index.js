import React, { useState, useEffect } from "react";

import axiosUser from '../../config/axiosUser';
import { Link } from "react-router-dom";
import Usuario from './Usuario';
import Swal from "sweetalert2";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {
    const response = await axiosUser.get('/getUsers/')
    console.log(response);
    setUsuarios(response.data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: "Un usuario no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        deleteUser(id);
      }
    })
  };

  const deleteUser = (id) => {
    axiosUser.delete(`/deleteUser/${id}`)
      .then(res => {
        console.log(res);
        if (res.status !== 200) {
          Swal.fire(
            'Eliminar Usuario',
            'Error al eliminar',
            'error'
          )
        } else {
          Swal.fire(
            'Eliminado',
            'Usuario eliminado con exito',
            'success'
          )
        }
        getUsuarios();
      });
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  const renderUsers = () => {
    return (
      <tbody>
        {
          usuarios.map((usuario, index) => (
            <Usuario
              key={index}
              index={index}
              name={usuario.name}
              lastname={usuario.lastname}
              job={usuario.job}
              email={usuario.email}
              password={usuario.password}
              salary={usuario.salary}
              id={usuario._id}
              onDelete={handleDelete}
            />
          ))
        }
      </tbody>
    )
  }

  return (
    <div className="container">
      <h4 className="display-4 text-center">Usuarios</h4>
      <div className="card text-center bg-dark text-white">
        <div className="card-body">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Contraseña</th>
                <th>Puesto</th>
                <th>Sueldo</th>
                <th></th>
              </tr>
            </thead>
            {renderUsers()}
          </table>
          <Link to="/agregarUsuario/"><button className="btn btn-primary float-right">Agregar Usuario</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;

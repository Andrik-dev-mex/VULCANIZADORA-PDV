import React from 'react';
import {Link} from 'react-router-dom';

const usuarios = ({ id, index, name, lastname, email, password, job, salary, onDelete }) => {
  return (
      <tr>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{lastname}</td>
        <td>{email}</td>
        <td>{password}</td>
        <td>{job}</td>
        <td>{salary}</td>
        <td>
          <div className="row">
            <div className="col-sm-6">
              < Link to= {`/editarUsuario/${id}`} className="btn btn-success">Actualizar</Link>
            </div>
            <div className="col-sm-1">
              <button className = "btn btn-danger"
                onClick = {() => {onDelete(id); }}       
              >Eliminar</button>
            </div>
          </div>
        </td>
      </tr>

  )
};

export default usuarios;
import React from 'react';
import { Link } from 'react-router-dom';


const Producto = ({index, id, sku, name,description, price, stock,onDelete }) => {
  return(
    <tr>
      <th scope = "row">{index + 1}</th>
      <td>{sku}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{stock}</td>
      <td>
        <Link  
          className = "btn btn-success mr-sm-3" 
          to = {`/actualizarProducto/${id}`}>
          Actualizar
        </Link>
        <button  
          className = "btn btn-danger mr-sm-4" 
          onClick = {() => {onDelete(id);}}     
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
};

export default Producto;
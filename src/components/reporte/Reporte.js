import React from 'react';

const Reporte = ({ index, id, total, client, totalProducts, date, onDelete }) => {
  return (
    <tr>
      <th scope = "col">{index + 1}</th>
      <td>{date}</td>
      <td>{client}</td>
      <td>{total}</td>
      <td>{totalProducts}</td>
      <td>
        <button className = "btn btn-danger" onClick = {() => {onDelete(id);}}>Cancelar</button>
      </td>
    </tr>
  )
};

export default Reporte;
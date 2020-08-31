import React from 'react';

const Reporte = ({ index, id, total, client, totalProducts, date, onCancel, status, color }) => {
  return (
    <tr style = {{color: color}}>
      <th scope = "col">{index + 1}</th>
      <td>{date}</td>
      <td>{client}</td>
      <td>{total}</td>
      <td>{totalProducts}</td>
      <td>
        <button className = "btn btn-danger" onClick = {() => {onCancel(id);}}>Cancelar</button>
      </td>
    </tr>
  )
};

export default Reporte;
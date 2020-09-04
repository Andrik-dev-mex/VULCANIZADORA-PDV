import React from 'react';

const producto = ({ index, id, sku, name, description, stock, price, importe, cant, onRemove, onChange, totalProductos, client }) => {

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{sku}</td>
      <td>{cant}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{stock}</td>
      <td>{price}</td>
      <td>{importe}</td>
      <td>
        <button className="btn btn-primary" onclick={() => { onRemove(index); }}>remover</button>
      </td>
    </tr>
  )
}

export default producto;

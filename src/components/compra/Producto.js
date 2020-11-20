import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

const producto = ({ index, id, sku, name, description, stock, price, importe, cant, onRemove, totalProductos, client }) => {
  return (
    <TableRow key={index}>
      <TableCell>{name}</TableCell>
      <TableCell align="right">{cant}</TableCell>
      <TableCell align="right">{importe}</TableCell>
      <TableCell align="right">{price}</TableCell>
    </TableRow>
  )
}

export default producto;

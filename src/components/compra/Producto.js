import React from "react";
import { TableRow, TableCell, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

const producto = ({
  index,
  handleChangeCant,
  id,
  sku,
  name,
  description,
  stock,
  price,
  importe,
  cant,
  onRemove,
  totalProductos,
  client,
  handleSubmitCant
}) => {
  return (
    <TableRow key={index}>
      <TableCell>{name}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell align="right">
        <form onSubmit={(e) => {handleSubmitCant(e, index)}}>
          <TextField
            label=""
            defaultValue={cant || 0}
            name="cant"
            onChange={(e) => {
              handleChangeCant(e);
            }}
          />
        </form>
      </TableCell>
      <TableCell align="right">{price}</TableCell>
      <TableCell align="right">{importe}</TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            onRemove(index);
          }}
          endIcon={<DeleteIcon />}
        >
          Remover
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default producto;

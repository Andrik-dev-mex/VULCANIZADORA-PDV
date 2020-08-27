import React from "react";

const Corte = ({ total, salesTotal, totalProducts }) => {
  return (
    <tr>
      <td>{salesTotal}</td>
      <td>{total}</td>
      <td>{totalProducts}</td>
    </tr>
  );
};

export default Corte;

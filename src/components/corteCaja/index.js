import React, { useState, useEffect } from "react";
import axiosUser from "../../config/axiosUser";
import Corte from "./Corte";
import Swal from "sweetalert2";

const CorteCaja = () => {
  const [sale, setSale] = useState([]);

  const [cort, setCort] = useState({
    totalProducts: '',
    total: '',
    salesTotal: '',
  });

  const handleSave = (e) => {
    e.preventDefault();
    saveCort();
  };


  const saveCort = () => {
    setCort({
      salesTotal: sale.length,
      total: calculateTotal(),
      totalProducts: calculateTotalProducts()
    });
    if (!cort.salesTotal && cort.totalProducts && cort.total === 0) {
      axiosUser.post(`/addCort`, cort)
        .then(res => {
          Swal.fire(
            'Realizar Corte',
            res.data.message,
            'success',
          );
        })
        .then(() => {
          axiosUser.delete('/deleteSold')
            .then(res => {
              console.log(res.data.message);
              getSales();
            });
        });
    } else {
      Swal.fire(
        'Corte de Caja',
        'No se puede realizar el corte de caja porque no hay nada para guardar.',
        'error'
      );
    }

  };

  const getSales = () => {
    axiosUser.get("/sold/").then((res) => {
      setSale(res.data);
    });
  };

  const renderCort = () => {
    return (
      <Corte
        salesTotal={calculateSales()}
        total={calculateTotal()}
        totalProducts={calculateTotalProducts()}
      />)
  };

  const calculateSales = () => {
    let numSales = sale.length;
    sale.forEach(sales => {
      if (!sales.active) {
        numSales -= 1
      }
    });
    return numSales;
  };

  const calculateTotal = () => {
    let total = 0;
    sale.forEach(sales => {
      if (sales.active) {
        total += sales.total;
      }
    });
    return total;
  };

  const calculateTotalProducts = () => {
    let total = 0;
    sale.forEach(sales => {
      if (sales.active) {
        total += sales.totalProducts;
      }
    });
    return total;
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="container">
      <h4 className="display-4 text-center">Realizar Corte de Caja</h4>
      <div className="card bg-dark">
        <div className="card-body">
          <table className="table table-hover table-dark text-center table-striped">
            <thead>
              <th scope="col">Ventas realizadas</th>
              <th scope="col">Monto Total</th>
              <th scope="col">Productos vendidos</th>
            </thead>
            <tbody>{renderCort()}</tbody>
          </table>
          <button onClick={handleSave} className="btn btn-danger">Hecho</button>
        </div>
      </div>
    </div>
  );
};

export default CorteCaja;

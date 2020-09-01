import React, { useState, useEffect } from "react";
import axiosUser from "../../config/axiosUser";
import Corte from "./Corte";
import Swal from "sweetalert2";

const CorteCaja = () => {
  const [sale, setSale] = useState([]);

  const [cort, setCort] = useState({
    totalProducts: 0,
    total: 0,
    salesTotal: 0,
    products: []
  });

  const handleSave = (e) => {
    e.preventDefault();
    calculateData();
    saveCort();
  };


  const saveCort = () => {
    console.log(cort);
    if (cort.total && cort.salesTotal !== 0) {
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
              console.log(cort);
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

  const getSales = async () => {
    const res = await axiosUser.get("/sold/");
    setSale(res.data);
  };


  const renderCort = () => {
    return (
      <Corte
        salesTotal={calculateSales()}
        total={calculateTotal()}
        totalProducts={calculateProducts()}
      />)
  };

  const calculateTotal = () => { 
    let total = 0;
    sale.forEach(sales => {
      total += sales.total;
    });
    return total;
  };

  const calculateProducts = () => {
    let total = 0;
    sale.forEach(sales => {
      if(sales.active){
        total += sales.totalProducts;
      }
    });
    return total;
  };

  const calculateSales = () => {
    let saleTotals = sale.length;
    sale.forEach(sales => {
      if(!sales.active){
        saleTotals -= 1;
      };
    });
    return saleTotals;
  };

  const calculateData = () => {
    let numsales = sale.length;
    let total = 0;
    let totalProducts = 0;
    let products = [];
    sale.forEach(sales => {
      if (sales.active) {
        numsales -= 1;
        total += sales.total;
        totalProducts += sales.totalProducts;
        products.push(sales.products);
      };

    });
    setCort({
      totalProducts: totalProducts,
      total: total,
      salesTotal: numsales,
      products: products
    })
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

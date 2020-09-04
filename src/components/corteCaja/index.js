import React, { useState, useEffect } from "react";
import axiosUser from "../../config/axiosUser";
import Corte from "./Corte";
import Swal from "sweetalert2";

const CorteCaja = () => {
  const [sale, setSale] = useState([]);

  let cort = {};

  const handleSave = (e) => {
    e.preventDefault();
    saveCort();
  };

  const saveCort = () => {
    cort = {
      totalProducts :calculateProducts(),
      total : calculateTotal(),
      salesTotal : calculateSales(),
      products : getProducts(),
    };

    if (calculateTotal() && calculateSales() !== 0) {
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

  const getProducts = () => {
    let productsAux = [];
    let productNew = {};
    sale.forEach(sales => {
      if(sales.active){
        sales.products.forEach(product => {
          let name = product.name;
          let price = product.price;
          let cant = product.cant;
          let importe = product.importe;
          productNew = {
            name : name,
            price : price,
            cant : cant,
            importe : importe
          };
          productsAux.push(productNew);
        });
      }
    });
    console.log(productNew);
    return productsAux;
  };

  const calculateTotal = () => { 
    let total = 0;
    sale.forEach(sales => {
      if(sales.active){
        total += sales.total;
      }
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
    console.log(total);
    return total;
  };

  const calculateSales = () => {
    let saleTotals = sale.length;
    sale.forEach(sales => {
      if(!sales.active){
        saleTotals -= 1;
      };
    });
    console.log(saleTotals);
    return saleTotals;
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

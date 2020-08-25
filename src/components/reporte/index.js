import React, { useState, useEffect } from "react";
import Reporte from "../reporte/Reporte";
import axiosUser from "../../config/axiosUser";
import Swal from "sweetalert2";

const Reportes = () => {
  const [ventas, setVentas] = useState([]);

  const getVentas = () => {
    axiosUser.get("/sold/").then((res) => {
      setVentas(res.data);
      console.log(res.data);
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás Seguro?",
      text: "Una venta no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        returnStock(id);
        cancelSold(id);
      }
    });
  };

  const cancelSold = (id) => {
    axiosUser.delete(`/sold/${id}`).then((res) => {
      console.log(res);
      if (res.status !== 200) {
        Swal.fire("Eliminar Venta", "Error al eliminar", "error");
      } else {
        Swal.fire("Eliminada", "Venta eliminado con exito", "success");
      }
      getVentas();
    });
  };

  const returnStock = (id) => {
    let productsSale = [];
    let _id = 0;
    let cant = 0;
    axiosUser
      .get(`/sold/${id}`)
      .then((res) => {
        productsSale = res.data.products;
        console.log(productsSale);
      })
      .then(() => {
        productsSale.forEach((product) => {
          _id = product._id;
          cant = product.cant;
          axiosUser.get(`/products/${_id}`).then((res) => {
            const oldProduct = res.data;
            oldProduct.stock += cant;
            axiosUser.put(`/products/${_id}`, oldProduct).then((res) => {
              Swal.fire(
                "Cancelar Venta",
                "Inventario Actualizado con Exito",
                "success"
              );
            });
          });
        });
      });
  };

  const renderVentas = () => {
    return (
      <tbody>
        {ventas.map((venta, index) => (
          <Reporte
            key={index}
            index={index}
            date={venta.date}
            client={venta.client}
            totalProducts={venta.totalProducts}
            onDelete={handleDelete}
            total={venta.total}
            id={venta._id}
          />
        ))}
      </tbody>
    );
  };

  useEffect(() => {
    getVentas();
  }, []);

  return (
    <div className="container">
      <h4 className="display-4 text-center">Ventas</h4>
      <div className="card bg-dark">
        <div className="card-body">
          <table className="table table-striped table-hover text-center table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Cliente</th>
                <th scope="col">Total Vendido</th>
                <th scope="col">Productos Vendidos</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            {renderVentas()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reportes;

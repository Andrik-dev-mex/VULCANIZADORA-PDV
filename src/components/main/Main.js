import React from "react";
import Card from "./CardMain";
import ImgVenta from "./m-ventas.png";
import ImgProducto from "./producto.png";
import ImgReporte from "./periodico.png";
import ImgUsuarios from "./grupo.png";
import ImgCorte from '../main/caja.png';

function main() {
  return (
    <div className="container">
      <h3 className="display-4 text-center">Bienvenido</h3>
      <div className="row">
        <div className="col-sm mt-2">
          <Card
            title="Ventas"
            img={ImgVenta}
            altl="Venta"
            text="Producto o Servicio"
            textButton="Vender"
            refe="/venta/"
          />
        </div>
        <div className="col-sm mt-2">
          <Card
            title="Inventario"
            img={ImgProducto}
            altl="Inventario"
            text="Agregar o Eliminar Productos"
            textButton="Administrar"
            refe={"/inventario/"}
          />
        </div>
        <div className="col-sm mt-2">
          <Card
            title="Reportes"
            img={ImgReporte}
            altl="Reporte"
            text="¿Cómo nos va?"
            textButton="Ver"
            refe={"/reportes/"}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm mt-2">
          <Card
            title="Usuarios"
            img={ImgUsuarios}
            altl="Usuarios"
            text="Agregar o Eliminar Usuarios"
            textButton="Administrar"
            refe="/usuarios"
          />
        </div>
        <div className="col-sm mt-2">
          <Card
            title="Corte de Caja"
            img={ImgCorte}
            altl="Usuarios"
            text="Es hora de terminar el día"
            textButton="Realizar"
            refe={"/corteCaja/"}
          />
        </div>
      </div>
    </div>
  );
}

export default main;

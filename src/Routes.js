import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './components/main/Main';
import Usuarios from './components/usuario';
import AgregarUsuario from './components/usuario/AgregarUsuario';
import EditarUsuario from './components/usuario/EditarUsuario';
import Productos from './components/productos';
import AgregarProducto from './components/productos/AgregarProducto'
import EditarProducto from './components/productos/EditarProducto';
import Venta from './components/compra';
import Reporte from './components/reporte';
import Corte from './components/corteCaja';

const Routes = () => {
    return(
    <Switch>
        <Route exact path = "/" component = {Main}/>
        <Route exact path = "/usuarios/" component = {Usuarios}/>
        <Route exact path = "/agregarUsuario/" component = {AgregarUsuario}/>
        <Route exact path = "/editarUsuario/:id" component = {EditarUsuario}/>
        <Route exact path = "/inventario/" component = {Productos}/>
        <Route exact path = "/agregarProducto/" component = {AgregarProducto}/>
        <Route exact path = "/actualizarProducto/:id" component = {EditarProducto}/>
        <Route exact path = "/venta/" component = {Venta}/>
        <Route exact path = "/reportes/" component = {Reporte}/>
        <Route exact path = "/corteCaja" component = {Corte}/>
    </Switch>
    );
}

export default Routes;

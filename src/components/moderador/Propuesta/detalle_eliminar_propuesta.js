import React, { Component } from "react";
import { graphql } from 'react-apollo';

//Queries
import SolicitudElimPropuesta from '../../../queries/request/SolicitudEliminarPropuesta';

class DetalleEliminarPropuesta extends Component {

    constructor(props) {
        super(props);
      }

    render() {
        if(this.props.SolicitudElimPropuesta.loading){
            return (
                <div>Loading...</div>
            );
        }
        const propuesta = this.props.SolicitudElimPropuesta.solicitudDeletePropuesta;
        return (
             <div className="card">
                <div className="card-content">
                    <p className="subtitle is-7">
                    Realizado por el usuario: <b>{propuesta.id_usuario.nombre}</b>&nbsp;&nbsp;
                    <img src={`../../assets/img/${propuesta.id_usuario.avatar}.png`} height="14" width="14"/></p>
                    <hr />
                    <p className="title"></p>
                    <p className="title is-4">Nombre de la propuesta: {propuesta.id_propuesta.titulo}</p>
                </div>
            </div>
        );
    }
}
export default graphql(SolicitudElimPropuesta, { name: 'SolicitudElimPropuesta' })(DetalleEliminarPropuesta)
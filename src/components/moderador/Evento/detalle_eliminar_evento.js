import React, { Component } from "react";
import { graphql } from 'react-apollo';

//Queries
import SolicitudElimEvento from '../../../queries/request/SolicitudEliminarEvento';

class DetalleEliminarEvento extends Component {

    constructor(props) {
        super(props);
      }

    render() {
        if(this.props.SolicitudElimEvento.loading){
            return (
                <div>Loading...</div>
            );
        }
        const evento = this.props.SolicitudElimEvento.solicitudDeleteEvento;
        return (
            <div className="card">
                <div className="card-content">
                    <p className="subtitle is-7">
                    Realizado por el usuario: <b>{evento.id_usuario.nombre}</b>&nbsp;&nbsp;
                    <img src={`../../assets/img/${evento.id_usuario.avatar}.png`} height="14" width="14"/></p>
                    <hr />
                    <p className="title"></p>
                    <p className="title is-4">Nombre del evento: {evento.id_evento.titulo}</p>
                </div>
            </div>
        );
    }
}
export default graphql(SolicitudElimEvento, { name: 'SolicitudElimEvento' })(DetalleEliminarEvento)
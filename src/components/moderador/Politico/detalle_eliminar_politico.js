import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

//Queries
import SolicitudPolitico from '../../../queries/SolicitudEliminarPolitico';

class DetalleEliminarPolitico extends Component {

    constructor(props) {
        super(props);
      }

    render() {
        if(this.props.SolicitudPolitico.loading){
            return (
                <div>Loading...</div>
            );
        }
        const politico = this.props.SolicitudPolitico.solicitudModificarPolitico;
        return (
            <div className="card">
                <div className="card-content">
                    <p className="subtitle is-7">
                    Realizado por el usuario: <b>{politico.usuario.nombre}</b>&nbsp;&nbsp;
                    <img src={`../../assets/img/${politico.usuario.avatar}.png`} height="14" width="14"/></p>
                    <hr />
                    <p className="title"></p>
                    <p className="title is-4">Nombre: {politico.nombre}</p>
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(SolicitudPolitico, {
        name: 'SolicitudPolitico'
    })
)(DetalleEliminarPolitico);
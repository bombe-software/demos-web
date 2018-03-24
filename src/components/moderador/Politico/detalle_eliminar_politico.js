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
        console.log(this.props);
        const politico = this.props.SolicitudPolitico.solicitudDeletePolitico;
        return (
            <div className="card">
                <div className="card-content">
                    <p className="subtitle is-7">
                    Realizado por el usuario: <b>{politico.id_usuario.nombre}</b>&nbsp;&nbsp;
                    <img src={`../../assets/img/${politico.id_usuario.avatar}.png`} height="14" width="14"/></p>
                    <hr />
                    <p className="title"></p>
                    <p className="title is-4">Nombre del politico: {politico.id_politico.nombre}</p>
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
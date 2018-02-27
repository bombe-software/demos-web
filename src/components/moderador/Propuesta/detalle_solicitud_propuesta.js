import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

//Queries
import SolicitudPropuesta from '../../../queries/SolicitudPropuesta';

class DetalleSolicitudPropuesta extends Component {

    constructor(props) {
        super(props);
      }

    render() {
        if(this.props.SolicitudPropuesta.loading){
            return (
                <div>Loading...</div>
            );
        }
        const propuesta = this.props.SolicitudPropuesta.solicitudPropuesta;
        return (
            <div className="card">

                <div className="card-content">
                    <p className="subtitle is-7">
                    Publicado por el usuario: <b>{propuesta.usuario.nombre}</b>&nbsp;&nbsp;
                    <img src={`../../assets/img/${propuesta.usuario.avatar}.png`} height="14" width="14"/></p>
                    <hr />
                    <p className="title is-4"><b>Título: </b>{propuesta.titulo}</p>
                    <p><b>Descripción: </b>{propuesta.descripcion}</p>
                    <p><b>Fecha de la propuesta: </b>{propuesta.fecha}</p>
                    <p>Tipo de propuesta: {propuesta.tipo_propuesta.nombre}</p>
                    <hr />
                    <b>Fuente de consulta: </b><a target="_blank" href={propuesta.referencia}>{propuesta.referencia}</a>
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(SolicitudPropuesta, {
        name: 'SolicitudPropuesta'
    })
)(DetalleSolicitudPropuesta);
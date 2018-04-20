import React, { Component } from "react";
import { graphql } from 'react-apollo';
//Queries
import SolicitudPropuesta from '../../../queries/request/SolicitudPropuesta';

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
        console.log(this.props);
        const propuesta = this.props.SolicitudPropuesta.solicitudPropuesta;
        return (
            <div className="card">
                <div className="card-content">
                    <p className="subtitle is-7">
                    Publicado por el usuario: <b>{propuesta.usuario.nombre}</b>&nbsp;&nbsp;
                    <img src={`../../assets/img/${propuesta.usuario.avatar}.png`} height="14" width="14"/></p>
                    <p className="subtitle is-7"><b>Politico: </b>{propuesta.politico.nombre}</p>
                    <hr />
                    <p className="title is-4"><b>Título: </b>{propuesta.titulo}</p>
                    <p><b>Descripción: </b>{propuesta.descripcion}</p>
                    <p><b>Fecha de la propuesta: </b>{propuesta.fecha}</p>
                    <p><b>Tipo de propuesta:</b> {propuesta.tipo_propuesta.tipo}</p>
                    <hr />
                    <b>Fuente de consulta: </b><a target="_blank" href={propuesta.referencia}>{propuesta.referencia}</a>
                </div>
            </div>
        );
    }
}
export default graphql(SolicitudPropuesta, { name: 'SolicitudPropuesta' })(DetalleSolicitudPropuesta)
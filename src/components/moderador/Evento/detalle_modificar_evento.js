import React, { Component } from "react";
import { graphql } from 'react-apollo';

//Queries
import SolicitudModifEvento from '../../../queries/request/SolicitudModificarEvento';

class DetalleModificarEvento extends Component {

    constructor(props) {
        super(props);
      }

    render() {
        if(this.props.SolicitudModifEvento.loading){
            return (
                <div>Loading...</div>
            );
        }

        const evento = this.props.SolicitudModifEvento.solicitudModificarEvento;
             return (
            <div className="card">
                <div className="card-content">
                    <p className="subtitle is-7">
                    Publicado por el usuario: <b>{evento.usuario.nombre}</b>&nbsp;&nbsp;
                    <img src={`../../assets/img/${evento.usuario.avatar}.png`} height="14" width="14"/></p>
                    <p className="subtitle is-7"><b>Politico: </b>{evento.politico.nombre}</p>
                    <hr />
                     <p className="title is-4"><b>Título: </b>{evento.titulo}</p>
                      <p><b>Descripción: </b>{evento.descripcion}</p>
                       <p><b>Fecha del evento: </b>{evento.fecha}</p>
                    <hr />
                    <b>Fuente de consulta: </b><a target="_blank" href={evento.referencia}>{evento.referencia}</a>
                </div>
            </div>
        );
    }
}
export default graphql(SolicitudModifEvento, { name: 'SolicitudModifEvento' })(DetalleModificarEvento)
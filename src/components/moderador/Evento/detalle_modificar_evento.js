import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

//Queries
import SolicitudEvento from '../../../queries/SolicitudModificarEvento';

class DetalleModificarEvento extends Component {

    constructor(props) {
        super(props);
      }

    render() {
        if(this.props.SolicitudEvento.loading){
            return (
                <div>Loading...</div>
            );
        }
        console.log(this.props);
        const evento = this.props.SolicitudEvento.solicitudModificarEvento;
        return (
            <div className="card">
                <div className="card-content">
                    <p className="subtitle is-7">
                    Publicado por el usuario: <b>{evento.usuario.nombre}</b>&nbsp;&nbsp;
                    <img src={`../../assets/img/${evento.usuario.avatar}.png`} height="14" width="14"/></p>
                    <hr />
                    <p className="title"></p>
                    <p className="title is-4">Nombre: {evento.nombre}</p>
                    <p><b>Cargo: </b>{evento.cargo}</p>
                    <p><b>Partido: </b>{evento.partido.nombre}</p>
                    <p><b>Estado: </b>{evento.estado.nombre}</p>
                    {evento.estudios[0] ? 
                        <p>
                        <b>Estudios: </b> &nbsp;
                        {evento.estudios[0].grado_academico.grado} 
                        en {evento.estudios[0].titulo} 
                        en {evento.estudios[0].lugar_estudio.nombre}
                        </p> : <p>No se encontraron estudios</p>
                    }
                    <hr />
                    <b>Fuente de consulta: </b><a target="_blank" href={evento.referencia}>{evento.referencia}</a>
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(SolicitudEvento, {
        name: 'SolicitudEvento'
    })
)(DetalleModificarEvento);
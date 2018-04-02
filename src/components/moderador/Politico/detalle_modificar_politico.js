import React, { Component } from "react";
import { graphql } from 'react-apollo';

//Queries
import SolicitudModifPolitico from '../../../queries/request/SolicitudModificarPolitico';

class DetalleModificarPolitico extends Component {

    constructor(props) {
        super(props);
      }

    render() {
        if(this.props.SolicitudModifPolitico.loading){
            return (
                <div>Loading...</div>
            );
        }
        const politico = this.props.SolicitudModifPolitico.solicitudModificarPolitico;
        return (
            <div className="card">
                <div className="card-content">
                    <p className="subtitle is-7">
                    Publicado por el usuario: <b>{politico.usuario.nombre}</b>&nbsp;&nbsp;
                    <img src={`../../assets/img/${politico.usuario.avatar}.png`} height="14" width="14"/></p>
                    <hr />
                    <p className="title"></p>
                    <p className="title is-4">Nombre: {politico.nombre}</p>
                    <p><b>Cargo: </b>{politico.cargo}</p>
                    <p><b>Partido: </b>{politico.partido.nombre}</p>
                    <p><b>Estado: </b>{politico.estado.nombre}</p>
                    {politico.estudios[0] ? 
                        <p>
                        <b>Estudios: </b> &nbsp;
                        {politico.estudios[0].grado_academico.grado} 
                        en {politico.estudios[0].titulo} 
                        en {politico.estudios[0].lugar_estudio.nombre}
                        </p> : <p>No se encontraron estudios</p>
                    }
                    <hr />
                    <b>Fuente de consulta: </b><a target="_blank" href={politico.referencia}>{politico.referencia}</a>
                </div>
            </div>
        );
    }
}
export default graphql(SolicitudModifPolitico, { name: 'SolicitudModifPolitico' })(DetalleModificarPolitico)
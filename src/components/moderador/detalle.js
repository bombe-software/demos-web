import React, { Component } from "react";
import { demos_krb_http  } from './../../config/deploy.js'

class Detalle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="card">
                <div className="card-content">
                    <p className="subtitle is-7">
                        {this.props.o.usuario ? <span>Publicado por el usuario: <b>{this.props.o.usuario.nombre}</b>&nbsp;&nbsp;</span> : ''}
                        {this.props.o.usuario ? <img src={`../../assets/img/${this.props.o.usuario.avatar}.png`} height="14" width="14" /> : ''}
                    </p>
                    {this.props.o.politico ? <p className="subtitle is-7"><b>Politico: </b>{this.props.o.politico.nombre}</p>: ''}
                    {this.props.o.nombre || this.props.o.cargo || this.props.o.partido || this.props.o.estado ||  this.props.tipo ||
                     this.props.o.titulo || this.props.o.descripcion || this.props.o.fecha ||  this.props.o.tipo_propuesta ||
                     this.props.o.propuesta || this.props.o.evento 
                    ? <hr /> : ''}
                    {this.props.o.nombre ? <p className="title is-4">Nombre: {this.props.o.nombre}</p> : ''}
                    {this.props.o.cargo ? <p><b>Cargo: </b>{this.props.o.cargo}</p> : ''}
                    {this.props.o.partido ? <p><b>Partido: </b>{this.props.o.partido.nombre}</p> : ''}
                    {this.props.o.estado ? <p><b>Estado: </b>{this.props.o.estado.nombre}</p> : ''}
                    {
                         this.props.o.estudios  ? this.props.o.estudios.length < 0 ? this.props.estudios[0] ? 
                        <p>
                            <b>Estudios: </b>
                            {this.props.o.estudios[0].grado_academico.grado}
                            en {this.props.o.estudios[0].titulo}
                            en {this.props.o.estudios[0].lugar_estudio.nombre}
                        </p> : <p>No se encontraron estudios</p>
                        : '' : ''
                    }
                    {this.props.o.propuesta ? <p className="title is-4"><b>Título: </b>{this.props.o.propuesta.titulo}</p> : ''}
                    {this.props.o.propuesta ? <p><b>Descripción: </b>{this.props.o.propuesta.descripcion}</p> : ''}
                    {this.props.o.evento ? <p className="title is-4"><b>Título: </b>{this.props.o.evento.titulo}</p> : ''}
                    {this.props.o.evento ? <p><b>Descripción: </b>{this.props.o.evento.descripcion}</p> : ''}
                    {this.props.tipo == 'Politico' && !this.props.o.politico ? <img src={`${demos_krb_http}/img/${this.props.o.id}.jpg`} height="80" width="80" /> : ''}
                    {this.props.o.titulo ? <p className="title is-4"><b>Título: </b>{this.props.o.titulo}</p> : ''}
                    {this.props.o.descripcion ? <p><b>Descripción: </b>{this.props.o.descripcion}</p> : ''}
                    {this.props.o.fecha ? <p><b>Fecha {this.props.o.fecha == 'Propuestas' ? <span>de la</span> : <span>del</span>} {this.props.tipo.toLowerCase()}: </b>{this.props.o.fecha}</p> : ''}
                    {this.props.o.tipo_propuesta ? <p>Tipo de {this.props.tipo.toLowerCase()}: {this.props.o.tipo_propuesta.tipo}</p> : ''}
                    {this.props.o.referencia ? <hr /> : '' }
                    {this.props.o.referencia ?  <span><b>Fuente de consulta: </b> <a target="_blank" href={this.props.o.referencia}>{this.props.o.referencia}</a></span> : ''}
                </div>
            </div>
        );
    }
}
export default Detalle;
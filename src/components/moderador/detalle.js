import React, { Component } from "react";

class Lista extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <p className="subtitle is-7">
                        {this.props.o.usuario ? <span>Publicado por el usuario: <b>{this.props.o.usuario.nombre}</b>&nbsp;&nbsp;</span> : ''}
                        {this.props.o.usuario ? <img src={`../../assets/img/${this.props.o.usuario.avatar}.png`} height="14" width="14" /> : ''}
                    </p>
                    {this.props.o.nombre ? <p className="subtitle is-7"><b>{this.props}: </b>{this.props.o.politico.nombre}</p> : ''}
                    <hr />
                    {this.props.o.titulo ? <p className="title is-4"><b>Título: </b>{this.props.o.titulo}</p> : ''}
                    {this.props.o.descripcion ? <p><b>Descripción: </b>{this.props.o.descripcion}</p> : ''}
                    {this.props.o.fecha ? <p><b>Fecha de la {this.props.tipo.toLowerCase()}: </b>{this.props.o.fecha}</p> : ''}
                    {this.props.o.tipo_propuesta ? <p>Tipo de {this.props.tipo.toLowerCase()}: {this.props.o.tipo_propuesta.nombre}</p> : ''}
                    <hr />
                    {this.props.o.referencia ? <span><b>Fuente de consulta: </b> <a target="_blank" href={this.props.o.referencia}>{this.props.o.referencia}</a></span> : ''}
                </div>
            </div>
        );
    }
}
export default Lista;
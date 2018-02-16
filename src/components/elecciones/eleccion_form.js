import React, { Component } from "react";
import _ from "lodash";

import { graphql, compose } from 'react-apollo';
import eleccion from "../../queries/fetchVotacionEstado";
import usuario from "../../queries/fetchUsuario";
import voto_por_estado from "./../../mutations/voto_por_estado";

class EleccionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_preferencia: "",
            mensaje: ""
        };

        this.handleClick = this.handleClick.bind(this);
        this.handlePolitico = this.handlePolitico.bind(this);
        this.renderListPoliticos = this.renderListPoliticos.bind(this);
    }
    /**
    * Es una forma de capturar cualquier error en la clase 
    * y que este no crashe el programa, ayuda con la depuracion
    * de errores
    * @method componentDidCatch
    * @const info Es más informacion acerca del error
    * @const error Es el titulo del error
    */
    componentDidCatch(error, info) {
        console.log("Error: " + error);
        console.log("Info: " + info);
    }

    handlePolitico(id) {
        this.setState({ id_preferencia: id });
    }

    handleClick() {
        if (this.state.id_preferencia.length == 0) {
            this.setState({ mensaje: "Selecciona a alguien" })
        }else{
            this.props.updateVoto({
                variables: {
                    id_votacion: this.props.fetchEleccion.votacion.id,
                    id_usuario: this.props.fetchUsuario.usuario.id,
                    id_preferencia: this.state.id_preferencia,
                    id_estado: this.props.fetchEleccion.votacion.estado.id
                }
            }).then(alert('Informacion enviada'));
            this.props.handleForm();
        }
    }

    renderListPoliticos() {
        const preferencias = this.props.fetchEleccion.votacion.preferencias;
        let selected = {'color': 'red'}
        return _.map(preferencias, preferencia => {
            return (            
                <div style={{'cursor': 'pointer'}} key={preferencia.id}  onClick={() => this.handlePolitico(preferencia.id)}>
                    <br />
                    <div className="box" style={this.state.id_preferencia == preferencia.id ? {selected}:{}}>
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-32x32">
                          <img src="../../assets/img/politico.png" alt="Placeholder image" />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">{preferencia.politico.nombre}&nbsp;&nbsp;&nbsp;
                        </p>
                      </div>
                    </div>
                    </div>
              </div>
            );
        })
    }

    render() {
        return (
            <div>
                <div className="card-content">
                    <div className="title">
                        <nav className="breadcrumb" aria-label="breadcrumbs">
                            <ul>
                                <React.Fragment>
                                    <li><a href="#" >Estatal</a></li>
                                    <li><a href="#" >{this.props.zona}</a></li>
                                    <li key><a href="#" >{this.props.estado}</a></li>
                                </React.Fragment>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="card-image">
                    <div className="hero is-small">
                        <div className="hero-body">
                            {this.renderListPoliticos()}
                        </div>
                    </div>
                </div>
                <div className="level">
                    <div className="level-item">
                        {this.state.mensaje}
                    </div>
                </div>
                <div className="level">
                    <div className="level-item">
                        <button className="button is-primary" onClick={this.handleClick}>
                            Enviar respuesta
                        </button>
                    </div>
                    <div className="level-item">
                        <button className="button is-primary" onClick={this.props.handleForm}>
                            Regresar
                        </button>
                    </div>
                </div>
                <br /><br />
            </div>
        )
    }
}
export default compose(
    graphql(usuario, {
      name: 'fetchUsuario'
    }),
    graphql(eleccion, {
      name: 'fetchEleccion',
      options: ({ id_estado }) => ({ variables: { id_estado } }),
    }),
    graphql(voto_por_estado, {
        name: 'updateVoto'
    })
)(EleccionForm);


import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import fetchPropuesta from '../../../queries/fetchPropuesta';
import fetchUsuario from "../../../queries/fetchUsuario";

import PoliticoPerfil from './politico_perfil';

class PropuestaSeleccionada extends Component {
    constructor(props) {
        super(props);
        let { id, id_propuesta } = this.props.match.params;
        this.state = {
            id_politico: id
        };
    }

    renderSection() {
        if (!this.props.fetchPropuesta.loading && !this.props.fetchUsuario.loading) {
            let {titulo, descripcion, tipo_propuesta, referencia, usuario, politico} = this.props.fetchPropuesta.propuesta;
            return (
                <div>
                    <div>
                        <Link to={`/politico/${politico.id}`}>
                            <span className="is-4 title"><i className="fa fa-arrow-left"></i> Regresar</span>
                        </Link>
                    <Link to={`/propuesta/modify/${this.props.match.params.id_propuesta}`}>
                    <span className="is-4 title"><i className="fa fa-arrow-left"></i> Modificar</span>
                    </Link>
                    </div>
                    <br />
                    <div className="card">
                        <div className="card-content">
                            <p className="title is-3">{titulo}</p>
                            <hr />
                            <p><span className="is-5 tag is-light has-text-right">{tipo_propuesta.tipo}</span></p>
                            <br />
                            <p>{descripcion}</p>
                            <p>Fuente de consulta: <a href={referencia}>{referencia}</a></p>
                            {/*<br />
                        <p>Usuario: @{usuario.nombre}</p>*/}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="spinner"></div>
            );
        }
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

    render() {
        return (
            <div>
                <br />
                <div className="section">
                    <div className="columns is-desktop">
                        <div className="column is-2-fullhd is-3-widescreen is-3-desktop is-offset-1-desktop is-offset-1-widescreen is-12-tablet is-12-mobile is-offset-2-fullhd">
                            <PoliticoPerfil id={this.props.match.params.id} />
                        </div>
                        <div className="column is-6-fullhd is-7-widescreen is-7-desktop is-12-tablet is-12-mobile">
                            {this.renderSection()}
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        )
    }
}

export default
    compose(
        graphql(fetchUsuario, {
            name: 'fetchUsuario'
        }),
        graphql(fetchPropuesta, {
            name: 'fetchPropuesta',
            options: (props) => { return { variables: { id: props.match.params.id_propuesta } } }
        })
    )(PropuestaSeleccionada);
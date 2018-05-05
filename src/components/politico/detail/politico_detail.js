import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import Historial from './historial';
import Propuestas from './propuestas';

import fetchPoliticosDetail from '../../../queries/fetchPoliticoDetail';
import fetchUsuario from "../../../queries/fetchUsuario";

import PoliticoPerfil from './politico_perfil';

import LoadingScreen from '../../generic/loading_screen';

class PoliticoDetail extends Component {
    constructor(props) {
        super(props);
        let { id } = this.props.match.params;
        this.state = {
            type: 'propuestas',
            id_politico: id
        };
        this.updatePropuestas = this.updatePropuestas.bind(this);
        this.updateHistorial = this.updateHistorial.bind(this);
    }

    updatePropuestas() {
        this.setState({ type: 'propuestas' })
    }
    updateHistorial() {
        this.setState({ type: 'historial' })
    }

    renderSection() {
        if (!this.props.fetchPolitico.loading &&  !this.props.fetchUsuario.loading) {
            if (this.state.type == "propuestas") {
                return (
                    <div>
                        <Propuestas
                            cargo = {this.props.fetchPolitico.politicosPorId.cargo}
                            propuestas={this.props.fetchPolitico.politicosPorId.propuestas}
                            id_politico={this.props.fetchPolitico.politicosPorId.id}
                            id_usuario={this.props.fetchUsuario.usuario == undefined ? null : this.props.fetchUsuario.usuario.id}
                        />
                    </div>
                );
            } else if (this.state.type == "historial") {

                return (
                    <div>
                        <Historial
                            eventos={this.props.fetchPolitico.politicosPorId.eventos}
                            id_politico={this.props.fetchPolitico.politicosPorId.id}
                        />
                    </div>
                );
            }
        } else {
            return (
                <LoadingScreen />
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
    componentWillReceiveProps(nextProps) {
        nextProps.fetchPolitico.refetch();
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
                            <div className="tabs is-medium is-boxed">
                                <ul>
                                    <li className={this.state.type == "propuestas" ? 'is-active' : ''}>
                                        <a onClick={this.updatePropuestas}>
                                            <span className="icon is-small">
                                                <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                                            </span>
                                            <span>&nbsp;Propuestas</span>
                                        </a>
                                    </li>
                                    <li className={this.state.type == "historial" ? 'is-active' : ''}>
                                        <a onClick={this.updateHistorial}>
                                            <span className="icon is-small">
                                                <i className="fa fa-clock-o" aria-hidden="true"></i>
                                            </span>
                                            <span>&nbsp;Historial</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                {this.renderSection()}
                            </div>
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
        graphql(fetchPoliticosDetail, {
            name: 'fetchPolitico',
            options: (props) => { return { variables: { id: props.match.params.id } } }
        })
    )(PoliticoDetail);

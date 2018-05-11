import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { Link } from "react-router-dom";
import _ from 'lodash';

import EventoDetail from "./evento_detail";
import PropuestaDetail from "./propuesta_detail";

import LoadingScreen from './../../reutilizables/loading_screen';
import NeedLogin from './../../reutilizables/access/need_login';
import Historial from './historial';
import Propuestas from './propuestas';
import PoliticoPerfil from './politico_perfil';

import politico from "./../../../queries/politico";

class PoliticoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'propuestas',
            id_selected: ''
        };
        this.updatePropuestas = this.updatePropuestas.bind(this);
        this.updateHistorial = this.updateHistorial.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.regresar = this.regresar.bind(this);
    }

    updatePropuestas() {
        this.setState({ type: 'propuestas', id_selected: '' })
    }
    updateHistorial() {
        this.setState({ type: 'historial', id_selected: '' })
    }
    updateSearch(id_selected) {
        return () => {
            this.setState({ id_selected })
        }
    }

    regresar() {
        this.setState({ id_selected: '' })
    }

    renderSection() {
        if (this.state.id_selected.length == 0) {
            if (this.state.type == "propuestas") {
                return (
                    <div>
                        <div className="level">
                            <div className="level-left"></div>
                            <div className="level-right">
                                <div className="level-item">
                                    <p className="has-text-right">
                                        <Link to={"/propuesta/formulario/" + this.props.data.politico.id} className="button is-success">
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                            &nbsp;&nbsp;&nbsp;Agregar una propuesta
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="panel">
                            <div className="panel-heading">
                                Propuestas del político
                          </div>
                            <Propuestas
                                search={this.updateSearch}
                                cargo={this.props.data.politico.cargo}
                                propuestas={this.props.data.politico.propuestas}
                            />
                        </div>
                    </div>
                );
            } else if (this.state.type == "historial") {
                return (
                    <div>
                        <div className="level">
                            <div className="level-left">
                                <h2 className="title is-4">Eventos</h2>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <p className="has-text-right">
                                        <Link to={"/evento/formulario/" + this.props.data.politico.id} className="button is-success">
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                            &nbsp;&nbsp;&nbsp;Agregar un evento
                                        </Link >
                                    </p>
                                </div>
                            </div>
                        </div>
                        <ul className="timeline ">
                            <Historial
                                search={this.updateSearch}
                                eventos={this.props.data.politico.eventos}
                            />
                        </ul>
                    </div>
                );
            }
        } else {
            if (this.state.type == "propuestas") {
                const PropuestaDetailWithUsuario = NeedLogin(PropuestaDetail, 'variable');
                return (
                    <div>
                        <div>
                            <a onClick={this.regresar}>
                                <span className="is-5 title"><i className="fa fa-arrow-left"></i> Regresar</span>
                            </a>
                        </div>
                        <PropuestaDetailWithUsuario
                            id={this.state.id_selected}
                            handleOpen={this.handleOpen}
                        />
                    </div>
                );
            } else if (this.state.type == "historial") {
                const EventoDetailWithUsuario = NeedLogin(EventoDetail, 'variable');
                return (
                    <div>
                        <div>
                            <a onClick={this.regresar}>
                                <span className="is-5 title"><i className="fa fa-arrow-left"></i> Regresar</span>
                            </a>
                        </div>
                        <EventoDetailWithUsuario
                            id={this.state.id_selected}
                            handleOpen={this.handleOpen}
                        />
                    </div>
                );
            }
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
        if (this.props.data.loading) return <LoadingScreen />
        const PoliticoPerfilWithUsuario = NeedLogin(PoliticoPerfil, 'variable');
        return (
            <div>
                <br />
                <div className="section">
                    <div className="columns is-desktop">
                        <div className="column is-2-fullhd is-3-widescreen is-3-desktop is-offset-1-desktop is-offset-1-widescreen is-12-tablet is-12-mobile is-offset-2-fullhd">
                            <PoliticoPerfilWithUsuario
                                id={this.props.data.politico.id}
                                partido={this.props.data.politico.partido}
                                estudios={this.props.data.politico.estudios}
                                nombre={this.props.data.politico.nombre}
                            />
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
export default graphql(politico, {
    options: (props) => { return { variables: { id: props.match.params.id } } }
})(PoliticoDetail);

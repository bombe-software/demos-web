import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { Link } from "react-router-dom";
import _ from 'lodash';

import zonas from './../../queries/zonas.politicos';
import CardPolitico from './../reutilizables/cards/card_politico';

class Politicos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            puesto: 1,
            estado: '',
            zona: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch({ estado, puesto, zona }) {
        if (estado && zona) {
            return (() => {
                this.setState({
                    estado,
                    zona
                });
            })
        }
        if (puesto) {
            return (() => {
                this.setState({
                    puesto
                });
            })
        }
    }

    getActive({ puesto, estado }) {
        if (puesto) {
            if (puesto == this.state.puesto) {
                return 'is-active';
            }
        }
        if (estado) {
            if (estado == this.state.estado) {
                return 'is-active';
            }
        }
        return '';
    }

    renderEstados() {
        return this.props.data.zonas.map(({ id, nombre, estados }) => {
            return (
                <div key={id}>
                    <li>
                        <details>
                            <summary>{nombre}</summary>
                            <ul>
                                {estados.map(estado => {
                                    return (
                                        <li key={estado.id}>
                                            <a
                                                onClick={this.updateSearch({ estado: estado.id, zona: id })}
                                                className={this.getActive({ estado: estado.id })} >{estado.nombre}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </details>
                    </li>
                </div>
            );
        });

    }

    renderPoliticoList() {
        if (!this.state.estado) {
            return (
                <div>
                    <div className="card-image">
                        <div className="hero is-light">
                            <div className="hero-body">
                                <h3>No has seleccionado ningún estado</h3>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            const zona = _.find(this.props.data.zonas, { id: this.state.zona });
            const estado = _.find(zona.estados, { id: this.state.estado });
            const politicos = (this.state.puesto == 1) ? estado.candidatos : estado.funcionarios;
            return (
                <div>
                    <h3 className="title is-3">
                        <p>
                            {(this.state.puesto == 1) ? 'Candidato' : 'Funcionario'}&nbsp;/&nbsp;
                            {zona.nombre}&nbsp;/&nbsp;
                            {estado.nombre}
                        </p>
                    </h3>
                    <br />
                    {politicos.map(o => {
                            return (
                                <div key={id}>
                                    <CardPolitico o={o} />
                                    <br />
                                </div>
                            );
                    })}
                </div>
            );

        }
    }


    render() {
        if (this.props.data.loading) { return <div>Loading...</div> }
        return (
            <div className="section">
                <div className="columns mobile">
                    <div className="column is-10-widescreen is-10-desktop is-8-fullhd is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                        <h1 className="is-size-2 title">Políticos</h1>
                    </div>
                </div>
                <div className="columns is-desktop">
                    <div className="column is-3-desktop is-3-widescreen is-3-fullhd is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                        <aside className="menu">
                            <div>
                                <p className="menu-label">Tipo</p>
                                <ul className="menu-list-light">
                                    <li>
                                        <a onClick={this.updateSearch({ puesto: 1 })} className={this.getActive({ puesto: 1 })}>Candidato</a>
                                    </li>
                                    <li>
                                        <a onClick={this.updateSearch({ puesto: 2 })} className={this.getActive({ puesto: 2 })}>Funcionario</a>
                                    </li>
                                </ul>
                            </div>
                            <br />
                            <div>
                                <p className="menu-label">Region</p>
                                <ul className="menu-list-light">
                                    {this.renderEstados()}
                                </ul>
                            </div>
                        </aside>
                    </div>
                    <div className="column is-7-desktop is-7-widescreen is-5-fullhd is-12-tablet is-12-mobile">
                        <div>
                            <div className="level">
                                <div className="level-left"></div>
                                <div className="level-right">
                                    <div className="level-item">
                                        <p className="has-text-right">
                                            <Link to="/crear/politico" className="button is-success">
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                                &nbsp;&nbsp;&nbsp;Agregar un político
                                </Link >
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {this.renderPoliticoList()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default graphql(zonas)(Politicos);

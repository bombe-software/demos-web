import React, { Component } from "react";
import { graphql } from 'react-apollo';
import zonas from "../../queries/zonas.elecciones";
import EleccionDetail from "./eleccion_detail";
import EleccionForm from "./eleccion_form";
import LoadingScreen from '../reutilizables/loading_screen';

class Elecciones extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_estado: '',
            estado: '',
            zona: '',
            formActive: false
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.renderSection = this.renderSection.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    updateSearch(id, zona, estado) {
        return (() => {
            this.setState({
                id_estado: id,
                estado,
                zona
            });
        })
    }

    getActiveEstado(i) {
        if (i == this.state.id_estado) {
            return 'is-active';
        }
        return '';
    }

    handleForm() {
        if (this.state.formActive) {
            this.setState({
                formActive: false
            });
        } else {
            this.setState({
                formActive: true
            });
        }
    }

    renderEstados() {
        return this.props.data.zonas.map(item => {
            if (item.nombre == "Nacional") {
                return <div key={item.id}></div>;
            } else {
                return (
                    <div key={item.id}>
                        <li>
                            <details>
                                <summary>{item.nombre}</summary>
                                <ul>
                                    {item.estados.map(estado => {
                                        return (
                                            <li key={estado.id}>
                                                <a
                                                    onClick={this.updateSearch(estado.id, item.nombre, estado.nombre)}
                                                    className={this.getActiveEstado(estado.id)} >
                                                    {estado.nombre}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </details>
                        </li>
                    </div>
                );
            }
        });
    }

    renderSection() {
        if (this.state.id_estado == "")
            return (
                <div>
                    <div className="card-image">
                        <div className="hero is-light">
                            <div className="hero-body">
                                <h3>No has seleccionado ninguna elección</h3>
                            </div>
                        </div>
                    </div>
                </div>
            );
        if (this.state.formActive) {
            return (
                <EleccionForm
                    id_usuario={this.props.id_usuario}
                    id_estado={this.state.id_estado}
                    estado={this.state.estado}
                    zona={this.state.zona}
                    handleForm={this.handleForm}
                />
            );
        } else {
            return (
                <EleccionDetail
                    id_usuario={this.props.id_usuario}
                    id_estado={this.state.id_estado}
                    estado={this.state.estado}
                    zona={this.state.zona}
                    handleForm={this.handleForm}
                />
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
        if (this.props.data.loading) return <LoadingScreen />;
        return (
            <div className="section">
                <div className="columns is-desktop">
                    <div className="column is-10-widescreen is-10-desktop is-8-fullhd is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">
                                <h1 className="is-size-2 title">Elecciones</h1>
                                </div>
                            </div>
                        </div>
                        <h2 className="subtitle">Selecciona una región, visualiza las preferencias de candidatos en elecciones estatales, y participa en encuestas</h2>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-3-desktop is-3-widescreen is-3-fullhd is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                        <aside className="menu">
                            <div>
                                <p className="menu-label">Region</p>
                                <ul className="menu-list-light">
                                    {this.renderEstados()}
                                </ul>
                            </div>
                        </aside>
                    </div>
                    <div className="column is-7-desktop is-7-widescreen is-5-fullhd is-12-tablet is-12-mobile">
                        {this.renderSection()}
                    </div>
                </div>
            </div>
        )
    }
}
export default graphql(zonas)(Elecciones);

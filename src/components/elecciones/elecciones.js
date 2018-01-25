import React, { Component } from "react";
import { graphql } from 'react-apollo';
import zonas from "../../queries/fetchZonas";
import EleccionDetail from "./eleccion_detail";
import EleccionForm from "./eleccion_form";

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
        });
    }

    renderSection() {
        if (this.state.id_estado == "")
            return (
                <div>
                    <div className="card-image">
                        <div className="hero is-light">
                            <div className="hero-body">
                                <h3>No has seleccionado ninguna eleccion</h3>
                            </div>
                        </div>
                    </div>
                </div>
        );
        if (this.state.formActive) {
            return (
                <EleccionForm
                    id_estado={this.state.id_estado}
                    estado={this.state.estado}
                    zona={this.state.zona}
                    handleForm={this.handleForm}
                />
            );
        } else {
            return (
                <EleccionDetail
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
        if (this.props.data.loading) return <div>Cargando</div>;
        return (
            <div className="section">
                <div className="columns mobile">
                    <div className="column is-offset-1-tablet is-offset-1-mobile is-offset-2-desktop is-10-mobile is-10-tablet is-8-desktop">
                        <h1 className="is-size-2">Elecciones</h1>
                        <hr />
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-2-desktop is-3-tablet is-10-mobile is-offset-2-desktop is-offset-1-tablet is-offset-1-mobile">
                        <aside className="menu">
                            <div>
                                <p className="menu-label">Region</p>
                                <ul className="menu-list-light">
                                    {this.renderEstados()}
                                </ul>
                            </div>
                        </aside>
                    </div>
                    <div className="column is-6-desktop is-7-tablet is-10-mobile is-offset-1-mobile">
                        <div className="card">
                            {this.renderSection()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default graphql(zonas)(Elecciones);

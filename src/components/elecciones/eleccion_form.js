import React, { Component } from "react";
import _ from "lodash";

import { graphql } from 'react-apollo';
import eleccion from "../../queries/fetchVotacionEstado";

class EleccionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_politico: "",
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
        this.setState({ id_politico: id });
    }

    handleClick() {
        if (this.state.id_politico.length == 0) {
            this.setState({ mensaje: "Selecciona a alguien" })
        }else{
            //Cambiar el console.log() por el cambio en politico
            console.log(this.state.id_politico);
            this.props.handleForm();
        }
    }

    renderListPoliticos() {
        const preferencias = this.props.data.votacion[0].preferencias;
        return _.map(preferencias, preferencia => {
            return (
                <div key={preferencia.id} onClick={() => this.handlePolitico(preferencia.politico.id)}>
                    {preferencia.politico.nombre}
                </div>
            );
        })
    }

    render() {
        if (this.props.data.loading) return <div>Loading</div>
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
                </div>
                <br /><br />
            </div>
        )
    }
}
export default graphql(eleccion, {
    options: ({ id_estado }) => ({ variables: { id_estado } }),
})(EleccionForm);

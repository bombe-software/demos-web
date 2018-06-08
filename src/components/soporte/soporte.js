import React, { Component } from "react";
import { graphql } from 'react-apollo';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

import mensaje from "./../../mutations/especiales/mensaje";

class Soporte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mensajes: [],
            value: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault()
        const { value } = this.state;
        console.log(value);
        this.addMsgLeft(value);
        this.props.mutate({
            variables: {
                value
            }
        }).then(({ data }) => this.addMsgRight(data.mensaje));
    }

    addMsgLeft(texto) {
        const msg = {
            id: (this.state.mensajes.length),
            texto,
            is_bot: false
        }
        let mensajesM = this.state.mensajes;
        mensajesM.push(msg);
        this.setState({
            mensajes: mensajesM
        });
    }

    addMsgRight(texto) {
        const msg = {
            id: (this.state.mensajes.length),
            texto,
            is_bot: true
        }
        let mensajesM = this.state.mensajes;
        mensajesM.push(msg);
        this.setState({
            mensajes: mensajesM
        });
    }

    renderListMessages(mensajes) {
        return _.map(mensajes, mensaje => {
            if (mensaje.is_bot) {
                return (
                    <div key={mensaje.id}>
                        {this.renderRightMessage(mensaje)}
                    </div>
                );
            } else {
                return (
                    <div key={mensaje.id}>
                        {this.renderLeftMessage(mensaje)}
                    </div>
                );
            }
        });
    }

    renderLeftMessage(mensaje) {
        console.log(this.mensaje);
        console.log(this.props);
        return (
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <div className="box mensaje mensaje-usuario">
                            {mensaje.texto}
                        </div>
                    </div>
                </div>
                <div className="level-right">
                </div>
            </div>
        );
    }

    renderRightMessage(mensaje) {
        return (
            <div className="level">
                <div className="level-left">
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <div className="box mensaje mensaje-admin">
                            {mensaje.texto}
                        </div>
                    </div>
                </div>
            </div>
        );
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
            <div className="section">
                <div className="columns">
                    <div className="column is-10-widescreen is-10-desktop is-8-fullhd is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                        <h1 className="is-size-2 title">Soporte</h1>
                        <div className="hero">
                            <div className="">
                                <div className="inbox">
                                    {this.renderListMessages(this.state.mensajes)}
                                </div>
                                <div>
                                    <br />
                                    <div className="level">
                                        <div className="level-item">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <TextField
                                                            hintText="Hint Text"
                                                            value={this.state.value} 
                                                            onChange={this.handleChange}
                                                            onSubmit={this.onSubmit}
                                                        />
                                                    </div>
                                                    <div className="buttons has-text-centered">
                                                        <button type="submit" className="button is-primary" >
                                                            Enviar
                                                    </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <br />
                    </div>
                </div>
            </div>
        )
    }
}
export default graphql(mensaje)(Soporte);
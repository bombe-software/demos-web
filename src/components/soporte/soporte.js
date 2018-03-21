import React, { Component } from "react";
import { graphql } from 'react-apollo';
import axios from 'axios';
import _ from 'lodash';
import { Form, Field } from "react-final-form";
import GenericForm from './../generic/generic_form';
import mensaje from "./../../mutations/mensaje";

class Soporte extends GenericForm {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            mensajes:[]
        }
    }

    async onSubmit(values) {
        const { mensajeUser} = values;
        this.addMsgLeft(mensajeUser);
        this.props.mutate({
            variables: {
                mensajeUser
            }
        }).then(({data}) =>  this.addMsgRight(data.mensaje));
    }

    addMsgLeft(texto){
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

    addMsgRight(texto){
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
                        <div className="column
                        is-offset-1-mobile is-offset-1-tablet
                        is-offset-2-desktop is-offset-3-widescreen
                        is-8-desktop is-10-mobile
                        is-10-tablet is-6-widescreen">
                            <h1 className="is-size-2">Soporte</h1>
                            <hr />
                            <div className="hero">
                                <div className="">
                                    <div className="inbox">
                                        {this.renderListMessages(this.state.mensajes)}
                                    </div>
                                    <div>
                                        <br />
                                        <div className="level">
                                            <div className="level-item">
                                            <Form
                                                onSubmit={this.onSubmit}
                                                validate={values => {

                                                    const errors = {};
                                                     if (!values.mensajeUser) {
                                                        errors.mensajeUser = "Escriba un mensaje";
                                                    }
                                                     if(/^\s+|\s+$/.test(values.mensajeUser)) {
                                                         errors.mensajeUser = "No ingrese espacios";
                                                     }
                                                    return errors;
                                                }}
                                                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="level">
                                                            <div className="level-item">
                                                                <Field name="mensajeUser"
                                                                    component={this.renderTextField}
                                                                    hintText="Escribe su mensaje"
                                                                    floatingLabelText="Mensaje"
                                                                />
                                                            </div>
                                                        </div>
                                                    </form>
                                                )}
                                                />
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
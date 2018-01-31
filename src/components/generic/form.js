import React, { Component } from 'react';
import GenericForm from './generic_form';
import Field from './field';

class Form extends GenericForm {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            errors: []
        };
        this.setState = this.setState.bind(this);
        this.error = this.error.bind(this);
    }

    error(values) {
        const errors = [];
        if (values.nombre === "123") {
            errors["nombre"] = "Hola";
        }
        this.setState({ errors });
    }
    
    render() {
        return (
            <div>
                <Field
                    error={this.state.errors["nombre"]}
                    value={this.state.nombre}
                    changeState={this.setState}
                    mask={this.renderTextField}
                    placeholder={"Nombre"}
                    label={"Escribe un nombre"}
                />
            </div>
        );
    }
}

export default Form;


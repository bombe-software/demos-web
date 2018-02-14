import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ConfirmEmail extends GenericForm {

    constructor(props) {
        super(props);
        this.state = {
            mensaje: ''
        };
    }

    onSubmit(values) {
        console.log("Confirmacion")
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
        const { handleSubmit } = this.props;
        return (
            <div>
                <section className="hero is-large">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                                <div className="box"><h1 className="title is-3">Inicio de sesión</h1><hr />
                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <p>Te enviamos un correo electronico de {'info@bombesoftware.com'} con una clave, ingrésala para continuar</p>

                                        <div className="level">
                                            <div className="level-item">
                                                <input  />
                                            </div>
                                        </div>

                                        <div className="level">
                                            <div className="level-item">
                                                <input  />
                                            </div>
                                        </div>

                                        <div className="level">
                                            <div className="level-item">
                                                <input  />
                                            </div></div>

                                        <div className="level">
                                            {this.state.mensaje}
                                            <div className="level-item">
                                                <button type="submit" className="button">
                                                    Ingresar
                  </button>
                                            </div></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (values.clave == undefined) {
        errors.clave = "Ingrese la clave";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "ConfirmEmailForm"
})(connect(null, { confirmEmail })(ConfirmEmail));

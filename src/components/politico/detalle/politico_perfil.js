import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import delete_politico from './../../../mutations/delete/politico';
import BotonCaptcha from './../../reutilizables/boton_captcha';

class PoliticoPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.eliminar = this.eliminar.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
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
    eliminar() {
        let politico = this.props.id;
        let usuario = this.props.id_usuario;
        this.props.mutate({
            variables: {
                politico, usuario
            }
        }).then(this.handleOpen);
    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    render() {
        const { id, partido, estudios, nombre } = this.props;
            return (
                <div>
                    <Dialog
                        title="Tu propuesta de eliminación está en espera de aprobación"
                        actions={[<FlatButton label="Submit" primary={true} keyboardFocused={false} onClick={this.handleClose} />]}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        Espera la aprobación de un moderador de tu propuesta
                    </Dialog>
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-1by1">
                                <img src="../../../assets/img/politico.png" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="is-size-5 has-text-centered">
                                <span>{nombre}</span>
                            </div>
                            <hr />
                            <span className="is-size-6">
                                <p>Partido: {partido.nombre}</p>
                                <p>Titulo: {estudios[0].titulo}</p>
                                <p>Grado academico: {estudios[0].grado_academico.grado}</p>
                                <p>Lugar de estudio: {estudios[0].lugar_estudio.nombre}</p>
                            </span>
                        </div>
                        <div className="card-footer">
                            <span className="card-footer-item">
                                <Link to={`/politico/modificar/${id}`}>
                                    <span className="is-6"><i className="fa fa-pencil"></i> Modificar</span>
                                </Link>
                            </span>
                            <span className="card-footer-item">
                                <BotonCaptcha label={"Borrar"} checkedFunction={this.eliminar} />
                            </span>
                        </div>
                    </div>
                </div>
            );
    }
}

export default graphql(delete_politico)(PoliticoPerfil);

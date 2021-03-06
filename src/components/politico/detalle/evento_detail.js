import React, { Component } from 'react';
import { Link } from "react-router-dom";
import evento$politico_detail from "../../../queries/evento.politico_detail";
import { graphql } from 'react-apollo';
import LoadingScreen from "./../../reutilizables/loading_screen"
import BotonCaptcha from './../../reutilizables/boton_captcha';
import evento$delete from "../../../mutations/delete/evento";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class EventoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.eliminar = this.eliminar.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
        let id_evento = this.props.data.evento.id;
        let id_usuario = this.props.data.evento.usuario.id;
        console.log(id_evento);
        console.log(id_usuario);
        this.props.mutate({
            variables: {
                id_evento, id_usuario
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
        if (this.props.data.loading) return <LoadingScreen />;
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
                <br />
                <div className="card">
                    <div className="card-content">
                        <p className="title is-3">{this.props.data.evento.titulo}</p>
                        <hr />
                        <p>{this.props.data.evento.fecha.substring(0, 10)}</p>
                        <br />
                        <p>{this.props.data.evento.descripcion}</p>
                        <p>Fuente de consulta: <a href={this.props.data.evento.referencia}>{this.props.data.evento.referencia}</a></p>
                        <br />
                        <p>Usuario: @{this.props.data.evento.usuario.nombre}</p>
                    </div>
                    <div className="card-footer">
                        <span className="card-footer-item">
                            <Link to={`/evento/modificar/${this.props.data.evento.id}`}>
                                <span className="is-6"><i className="fa fa-pencil"></i> Modificar</span>
                            </Link>
                        </span>
                        {(this.props.id_usuario) ? <span className="card-footer-item"><BotonCaptcha label={"Borrar"} checkedFunction={this.eliminar} /></span> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(evento$delete)(graphql(evento$politico_detail)(EventoDetail));

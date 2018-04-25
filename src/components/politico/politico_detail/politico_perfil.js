import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import deletePolitico from '../../../mutations/captcha/DeletePolitico';
import fetchPoliticoPerfil from '../../../queries/fetchPoliticoPerfil';
import fetchUsuario from '../../../queries/fetchUsuario';
import BotonCaptcha from './../../generic/boton_captcha';
import LoadingScreen from "../../generic/loading_screen";
class PoliticoPerfil extends Component {
    constructor(props) {
        super(props);
        let { id } = this.props;
        this.state = {
            id_politico: id,
            open: false
        };
        this.Eliminar = this.Eliminar.bind(this);
        this.renderBotonEliminar = this.renderBotonEliminar.bind(this);
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
    Eliminar() {
        let politico = this.props.id;
        let usuario = this.props.fetchUsuario.usuario.id;
        this.props.deletePolitico({
            variables: {
                politico, usuario
            }
        }).then(this.handleOpen);
    }
    renderBotonEliminar() {
        if (!this.props.fetchUsuario.usuario) {
        }
        else {
            return (
                <BotonCaptcha label={"Borrar"} checkedFunction={this.Eliminar} />
            );
        }
    }
    handleOpen(){
        this.setState({ open: true });
      };
    
      handleClose(){
        this.setState({ open: false });
      };
    
    shouldComponentUpdate(nextProps) {
        if (nextProps.fetchPolitico) {
            nextProps.fetchPolitico.refetch();
            return true;
        }
    }
    render() {
        if (this.props.fetchPolitico.politicosPorId != undefined) {
            let politico, { nombre, partido, estudios } = this.props.fetchPolitico.politicosPorId;
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
                                <Link to={`/politico/modify/${this.props.id}`}>
                                    <span className="is-6"><i className="fa fa-pencil"></i> Modificar</span>
                                </Link>
                            </span>
                            <span className="card-footer-item">
                                {this.renderBotonEliminar()}
                            </span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default compose(
    graphql(fetchPoliticoPerfil, {
        name: 'fetchPolitico',
        options: (props) => { return { variables: { id: props.id } } }
    }),
    graphql(fetchUsuario, {
        name: 'fetchUsuario'
    }),
    graphql(deletePolitico, {
        name: 'deletePolitico'
    })
)(PoliticoPerfil);

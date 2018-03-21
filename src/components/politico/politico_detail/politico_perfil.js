import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import deletePolitico from '../../../queries/DeletePolitico';
import fetchPoliticoPerfil from '../../../queries/fetchPoliticoPerfil';
import fetchUsuario from '../../../queries/fetchUsuario';
import BotonCaptcha from './../../generic/boton_captcha';
class PoliticoPerfil extends Component {
    constructor(props) {
        super(props);
        let { id } = this.props;
        this.state = {
            id_politico: id
        };
         this.Eliminar = this.Eliminar.bind(this);
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
    Eliminar(){
        let politico = this.props.id;
        let usuario = this.props.fetchUsuario.usuario.id;
        this.props.deletePolitico({
        variables: {
        politico,usuario
      }
    }).then(this.handleOpen); 
    }
    render() {
        if (this.props.fetchPolitico.politicosPorId != undefined) {
            let politico, {nombre, partido, estudios} = this.props.fetchPolitico.politicosPorId;
            return (
                <div>
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
                                <BotonCaptcha label={"Borrar"} checkedFunction={this.Eliminar}/>  
                            </span>
                        </div>
                    </div>

                </div>
            );
        } else {
            return (
                <div>
                    <div className="spinner">
                    </div>
                </div>
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

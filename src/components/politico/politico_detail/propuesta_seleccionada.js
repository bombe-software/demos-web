import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import deletePropuesta from '../../../mutations/captcha/DeletePropuesta';
import fetchPropuesta from '../../../queries/fetchPropuesta';
import fetchUsuario from "../../../queries/fetchUsuario";

import PoliticoPerfil from './politico_perfil';
import BotonCaptcha from './../../generic/boton_captcha';

class PropuestaSeleccionada extends Component {
    constructor(props) {
        super(props);
        let { id, id_propuesta } = this.props.match.params;
        this.state = {
            id_politico: id
        };
         this.Eliminar = this.Eliminar.bind(this);
         this.renderBotonEliminar = this.renderBotonEliminar.bind(this);
    }

   Eliminar(){
        let id_propuesta = this.props.match.params.id_propuesta;
        let id_usuario = this.props.fetchUsuario.usuario.id;
        this.props.deletePropuesta({
        variables: {
        id_propuesta,id_usuario
      }
    }).then(this.handleOpen); 
}
renderBotonEliminar(){
   if (!this.props.fetchUsuario.usuario) {
    }
    else {
        return(
            <BotonCaptcha label={"Borrar"} checkedFunction={this.Eliminar}/>  
        );
    }
}
    renderSection() {
        if (!this.props.fetchPropuesta.loading && !this.props.fetchUsuario.loading) {
            let {titulo, descripcion, tipo_propuesta, referencia, usuario, politico} = this.props.fetchPropuesta.propuesta;
            return (
                <div>
                    <div>
                        <Link to={`/politico/${politico.id}`}>
                            <span className="is-5 title"><i className="fa fa-arrow-left"></i> Regresar</span>
                        </Link> 
                    </div>
                    <br />
                    <div className="card">
                        <div className="card-content">
                            <p className="title is-3">{titulo}</p>
                            <hr />
                            <p><span className="is-5 tag is-light has-text-right">{tipo_propuesta.tipo}</span></p>
                            <br />
                            <p>{descripcion}</p>
                            <p>Fuente de consulta: <a href={referencia}>{referencia}</a></p>
                            {/*<br />
                        <p>Usuario: @{usuario.nombre}</p>*/}
                        </div>
                        <div className="card-footer">
                            <span className="card-footer-item">
                            <Link to={`/propuesta/modify/${this.props.match.params.id_propuesta}`}>
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
                <div className="spinner"></div>
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
        return (
            <div>
                <br />
                <div className="section">
                    <div className="columns is-desktop">
                        <div className="column is-2-fullhd is-3-widescreen is-3-desktop is-offset-1-desktop is-offset-1-widescreen is-12-tablet is-12-mobile is-offset-2-fullhd">
                            <PoliticoPerfil id={this.props.match.params.id} />
                        </div>
                        <div className="column is-6-fullhd is-7-widescreen is-7-desktop is-12-tablet is-12-mobile">
                            {this.renderSection()}
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        )
    }
}

export default
    compose(
        graphql(fetchUsuario, {
            name: 'fetchUsuario'
        }),
        graphql(fetchPropuesta, {
            name: 'fetchPropuesta',
            options: (props) => { return { variables: { id: props.match.params.id_propuesta } } }
        }),
        graphql(deletePropuesta, {
            name: 'deletePropuesta'
        })
    )(PropuestaSeleccionada);
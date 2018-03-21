
import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import deleteEvento from '../../../queries/DeleteEvento';
import fetchEvento from '../../../queries/fetchEvento';
import fetchUsuario from "../../../queries/fetchUsuario";

import NeedLogin from './../../generic/need_login';
import PoliticoPerfil from './politico_perfil';
import BotonCaptcha from './../../generic/boton_captcha';

class EventoSeleccionado extends Component {
    constructor(props) {
        super(props);
        let { id, id_evento } = this.props.match.params;
        this.state = {
            id_politico: id
        };
         this.Eliminar = this.Eliminar.bind(this);
         this.renderBotonEliminar = this.renderBotonEliminar.bind(this);
    }
 Eliminar(){
        let id_evento = this.props.match.params.id_evento;
        let id_usuario = this.props.fetchUsuario.usuario.id;
        this.props.deleteEvento({
        variables: {
        id_evento,id_usuario
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
        if (!this.props.fetchEvento.loading &&  !this.props.fetchUsuario.loading) {
        let {titulo, descripcion, fecha, referencia, politico, usuario} = this.props.fetchEvento.evento;
           return (
               <div>
                   <div>
                    <Link to={`/politico/${politico.id}`}>
                    <span className="is-4 title"><i className="fa fa-arrow-left"></i> Regresar</span>
                    </Link>
                    <Link to={`/evento/modify/${this.props.match.params.id_evento}`}>
                    <span className="is-4 title"><i className="fa fa-arrow-left"></i> Modificar</span>
                    </Link>
                    {this.renderBotonEliminar()}
                   
                   </div>
                   <br />
                   <div className="card">
                    <div className="card-content">
                        <p className="title is-3">{titulo}</p>
                        <hr />
                        <p>{fecha.substring(0, 10)}</p>
                        <br />
                        <p>{descripcion}</p>
                        <p>Fuente de consulta: <a href={referencia}>{referencia}</a></p>
                        <br />
                        <p>Usuario: @{usuario.nombre}</p>
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
        graphql(fetchEvento, {
            name: 'fetchEvento',
            options: (props) => { return { variables: { id: props.match.params.id_evento } } }
        }),
        graphql(deleteEvento, {
            name: 'deleteEvento'
        })
    )(EventoSeleccionado);
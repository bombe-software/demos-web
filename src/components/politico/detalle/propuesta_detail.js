import React, { Component } from 'react';
import { Link } from "react-router-dom";
import propuesta$politico_detail from "../../../queries/propuesta.politico_detail";
import { graphql } from 'react-apollo';
import LoadingScreen from "./../../reutilizables/loading_screen"
import BotonCaptcha from './../../reutilizables/boton_captcha';
import politico$delete from "../../../mutations/delete/politico";

class PropuestaDetail extends Component {
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
        let id_propuesta = this.props.data.propuesta.id;
        let id_usuario = this.props.data.propuesta.usuario.id;
        this.props.mutate({
            variables: {
                id_propuesta, id_usuario
            }
        }).then(this.handleOpen);
    }
    render() {
        if (this.props.data.loading) return <LoadingScreen />;
        return (
            <div>
                <br />
                <div className="card">
                    <div className="card-content">
                        <p className="title is-3">{this.props.data.propuesta.titulo}</p>
                        <hr />
                        <p>{this.props.data.propuesta.fecha.substring(0, 10)}</p>
                        <br />
                        <p>{this.props.data.propuesta.descripcion}</p>
                        <p>Fuente de consulta: <a href={this.props.data.propuesta.referencia}>{this.props.data.propuesta.referencia}</a></p>
                        <br />
                        <p>Usuario: @{this.props.data.propuesta.usuario.nombre}</p>
                    </div>
                    <div className="card-footer">
                        <span className="card-footer-item">
                            <Link to={`/propuesta/modificar/${this.props.data.propuesta.id}`}>
                                <span className="is-6"><i className="fa fa-pencil"></i> Modificar</span>
                            </Link>
                        </span>
                        {(this.props.id_usuario) ? <span className="card-footer-item"><BotonCaptcha label={"Borrar"} checkedFunction={this.Eliminar} /></span> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(politico$delete)(graphql(propuesta$politico_detail)(PropuestaDetail));

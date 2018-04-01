import React, { Component } from "react";
import _ from "lodash";
import { graphql, compose } from 'react-apollo';
import usuario from "./../../queries/fetchUsuario";
import fetchLikesNacionalPorEstado from "./../../queries/fetchLikesNacionalPorEstado";
import Voto_nacional from "./../../mutations/voto _nacional";

class NacionalForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_politico_preferido: "",
            mensaje: ""
        };

        this.handleClick = this.handleClick.bind(this);
        this.handlePolitico = this.handlePolitico.bind(this);
        this.renderListPoliticos = this.renderListPoliticos.bind(this);
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

    handlePolitico(id) {
        this.setState({ id_politico_preferido: id });
    }

    handleClick() {
        if (this.state.id_politico_preferido.length == 0) {
            this.setState({ mensaje: "Selecciona a alguien" })
        } else {
            this.props.updateVoto({
                variables: {
                    id_estado: this.props.id_estado,
                    id_usuario: this.props.fetchUsuario.usuario.id,
                    id_politico: this.state.id_politico_preferido
                }
            }).then(console.log("cambios hechos"));
        }
    }

    renderListPoliticos() {
        //Agregar render de politicos
        return this.props.fetch.likes_nacionalPorEstado.map(({ politico }) => {
            return (
                <div key={politico.id} onClick={() => this.handlePolitico(politico.id)}>
                    <div className="hover-hero">
                        <div className="box" style={this.state.id_politico_preferido == politico.id ? {backgroundColor: "#7561CE", color: "white"} : {}}>
                            {politico.nombre}
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        if (this.props.fetch.loading || this.props.updateVoto.loading || this.props.fetchUsuario.loading) return <div> </div>
        return (
            <div>
                
                <div className="hero is-small">
                    <div className="hero-body">
                        {this.renderListPoliticos()}
                    </div>
                </div>
                
                <div className="level">
                    <div className="level-item">
                        {this.state.mensaje}
                    </div>
                </div>
                <div className="level">
                    <div className="level-item">
                        <button className="button is-primary" onClick={this.handleClick}>
                            Enviar respuesta
                        </button>
                    </div>
                </div>
                <br /><br />
            </div>
        )
    }
}
export default compose(
    graphql(Voto_nacional, {
        name: 'updateVoto'
    }),
    graphql(fetchLikesNacionalPorEstado, {
        name: 'fetch',
        options: (props) => { return { variables: { id_estado: props.id_estado } } }
    }),
    graphql(usuario, {
        name: 'fetchUsuario'
    })
)(NacionalForm);

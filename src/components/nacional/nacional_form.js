import React, { Component } from "react";
import _ from "lodash";
import { graphql, compose } from 'react-apollo';
import likes_nacional_by_estado from "./../../queries/likes_nacional_by_estado";
import voto_nacional from "./../../mutations/especiales/voto_nacional";
import { Link } from "react-router-dom";

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

    componentDidMount() {

    }

    handlePolitico(id) {
        this.setState({ id_politico_preferido: id });
    }

    handleClick() {
        if (this.state.id_politico_preferido.length == 0) {
            this.setState({ mensaje: "Selecciona a alguien" })
        } else {
            this.props.mutate({
                variables: {
                    id_estado: this.props.id_estado,
                    id_usuario: this.props.id_usuario,
                    id_politico: this.state.id_politico_preferido
                },
                refetchQueries: [{ 
                    query: likes_nacional_by_estado,
                    variables: { id_estado: this.props.id_estado } 
                }]
            });
        }
    }

    renderListPoliticos() {
        //Agregar render de politicos
        return this.props.data.like_nacionals_by_id_estado.map(({ politico, usuarios }) => {
            return (
                <div key={politico.id} >
                    <div style={this.state.id_politico_preferido == politico.id ? {color: "#50C9A4"} : {color: '#565656'}} onClick={() => this.handlePolitico(politico.id)}>
                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    {this.state.id_politico_preferido!==politico.id?
                                    <i className="fa fa-square-o" aria-hidden="true"></i>
                                    :
                                    <i className="fa fa-check-square-o" aria-hidden="true"></i>
                                     }
                                </div>
                                <div className="level-item">
                                    <div>
                                        <p className="is-size-5 clickable">{politico.nombre}</p>
                                        <p>{politico.partido.nombre}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <button className="button">
                                        <Link to={`/politico/${politico.id}`}>Ver perfil</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            );
        })
    }

    render() {
        if (this.props.data.loading) return <div> </div>
        return (
            <div>

                <div className="hero is-small">
                    <div className="hero-body">
                        <h2 className="subtitle is-size-4">Elija al candidato de su preferencia para participar en la encuesta nacional</h2>
                        {this.renderListPoliticos()}
                    </div>
                </div>

                <div className="panel">
                    {this.state.mensaje}
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
export default graphql(voto_nacional)(graphql(likes_nacional_by_estado, 
    {
          options: (props) => { return { variables: { id_estado: props.id_estado } } }
    })(NacionalForm))


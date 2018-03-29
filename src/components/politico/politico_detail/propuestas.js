import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like  from './like';

class Propuestas extends Component {
    constructor(props) {
        super(props);
        this.renderPropuestaList = this.renderPropuestaList.bind(this);
    }
    renderLike(id_propuesta,id_usuario, likes){
        if(id_usuario != undefined)
            return <Like id_propuesta={id_propuesta} id_usuario={id_usuario} likes={likes} />;
        else
            return ""
    }

    renderPropuestaList() {
        const { id_politico, propuestas, id_usuario, cargo } = this.props;
        return propuestas.map(({ id, fecha, titulo, tipo_propuesta, likes }) => {
            if (fecha && id && titulo && tipo_propuesta) return (
                <div key={id}>
                    <div className="panel-block">
                        <p className="is-size-5">
                            <Link to={`/politico/${id_politico}/propuesta/${id}`} className="has-text-dark">{titulo}</Link> &nbsp;{" "}&nbsp;<span className="is-size-7 tag is-light has-text-right">{tipo_propuesta.tipo}</span>
                        </p>
                        <div className={cargo != "Candidato" ? "hidden" : ""}>
                            {this.renderLike(id ,id_usuario, likes)}
                        </div>
                    </div>
                </div>
            );
        });
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
                <div className="level">
                    <div className="level-left"></div>
                    <div className="level-right">
                        <div className="level-item">
                            <p className="has-text-right">
                                <Link to={"/crear/propuestas/" + this.props.id_politico} className="button is-success">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    &nbsp;&nbsp;&nbsp;Agregar una propuesta
                          </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-heading">
                        Propuestas del político
                      </div>
                    {this.renderPropuestaList()}
                </div>
            </div>
        );
    }
}

export default Propuestas; 

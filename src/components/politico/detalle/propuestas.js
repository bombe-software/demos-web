import React, { Component } from "react";
import { Link } from "react-router-dom";
//import Like  from './like';

class Propuestas extends Component {
    constructor(props) {
        super(props);
    }
    /*
    renderLike(id_propuesta,id_usuario, likes){
        if(id_usuario != undefined)
            return <Like id_propuesta={id_propuesta} id_usuario={id_usuario} likes={likes} />;
        else
            return ""
    }
    */
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
        const { propuestas, cargo } = this.props;
        return propuestas.map(({ id, fecha, titulo, tipo_propuesta, likes }) => {
            if (fecha && id && titulo && tipo_propuesta) return (
                <div key={id}>
                    <div className="panel-block">
                        <p className="is-size-5">
                            <a className="has-text-dark" onClick={this.props.search(id)}>{titulo}</a> &nbsp;{" "}&nbsp;<span className="is-size-7 tag is-light has-text-right">{tipo_propuesta.tipo}</span>
                        </p>
                        <div className={cargo != "Candidato" ? "hidden" : ""}>
                            {/*this.renderLike(id ,id_usuario, likes)*/}
                        </div>
                    </div>
                </div>
            );
        });
    }
}

export default Propuestas; 

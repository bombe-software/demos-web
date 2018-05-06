import React, { Component } from "react";
import { Link } from "react-router-dom";

class Historial extends Component {
    constructor(props) {
        super(props);
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
        const { eventos, cargo } = this.props;
        return this.props.eventos.map(({ id, titulo, fecha }) => {
            return (
                <div key={id} >
                    <div className="columns is-mobile is-relative">
                        <div className="column timeline-element">
                            <div className="point">
                            </div>
                            <div className="timeline-text">
                                <div className="box">
                                    <a  onClick={this.props.search(id)}>
                                        {fecha.substring(0, 10)} | {titulo}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }
}
export default Historial;

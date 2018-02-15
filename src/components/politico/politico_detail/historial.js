import React, { Component } from "react";
import { Link } from "react-router-dom";

class Historial extends Component {
    constructor(props) {
        super(props);
        this.renderHistorialList = this.renderHistorialList.bind(this);
    }

    renderHistorialList() {
        console.log(this.props);
        const { id_politico, eventos, id_usuario, cargo } = this.props;
        return this.props.eventos.map(({id, titulo, fecha}) => {
            return (
                <div key={id} >
                    <div className="columns is-mobile is-relative">
                        <div className="column timeline-element">
                            <div className="point">
                            </div>
                            <div className="timeline-text">
                                <div className="box">
                                    <Link to={`/politico/${id_politico}/evento/${id}`}>
                                        {fecha.substring(0, 10)} | {titulo}
                                    </Link>
                                </div>
                            </div>
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

        if (this.props.eventos != undefined) {
            return (
                <div>
                    <div className="level">
                        <div className="level-left"></div>
                        <div className="level-right">
                            <div className="level-item">
                                <p className="has-text-right">
                                    <Link to={"/crear/historial/" + this.props.id_politico} className="button is-success">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                        &nbsp;&nbsp;&nbsp;Agregar un evento
                                    </Link >
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                    <ul className="timeline ">
                        {this.renderHistorialList()}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="spinner">
                </div>
            );
        }
    }
}



export default Historial;

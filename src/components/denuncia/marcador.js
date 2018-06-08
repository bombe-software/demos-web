import React, { Component } from 'react';
import {
    Marker,
    InfoWindow
} from "react-google-maps";

class Marcador extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            isOpen: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
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

    open(){
        this.setState({
            isOpen: true
        })
    }

    close(){
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <Marker
                key={this.props.id}
                position={{ lat: parseFloat(this.props.ubicacion.split(',')[0]), lng: parseFloat(this.props.ubicacion.split(',')[1]) }}
                onClick={this.props.open}
            >
                {this.state.isOpen ? <InfoWindow onCloseClick={this.close}>
                    <div>Titulo: {this.props.titulo}<br />Descripcion:{this.props.descripcion}</div>
                </InfoWindow> : ''}
            </Marker>
        )
    }
}

export default Marcador;

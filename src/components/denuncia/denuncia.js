import React, { Component } from 'react';
//import { compose, withProps, withStateHandlers } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap
} from "react-google-maps";
import { graphql } from 'react-apollo';

//queries
import denuncias from './../../queries/denuncias';

//components
import Loading_Screen from './../reutilizables/loading_screen';
import Marcador from './marcador';


class Denuncia extends Component {

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
        if (this.props.data.loading) return <Loading_Screen />;
        const GoogleMapWithPreconfig =
            <GoogleMap
                defaultZoom={4}
                defaultCenter={{ lat: 20.0036238, lng: -104.1757264 }}
            >
                {this.props.data.denuncias.map(element => {
                    return
                    <Marcador
                        id={element.id}
                        titulo={element.titulo}
                        descripcion={element.descripcion}
                        ubicacion={element.ubicacion} />;
                })}
            </GoogleMap>;
        const MapWithAMarker = withScriptjs(withGoogleMap(GoogleMapWithPreconfig));
        return <MapWithAMarker />;
    }
}

export default graphql(denuncias)(Denuncia);

import React, { Component } from 'react';
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
        const { data } = this.props;
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={4}
                defaultCenter={{ lat: 20.0036238, lng: -104.1757264 }}
            >
                {data.denuncias.map(element => {

                    return(
                    <Marcador
                        id={element.id}
                        key={element.id}
                        titulo={element.titulo}
                        descripcion={element.descripcion}
                        ubicacion={element.ubicacion} />
                    );
                })}
            </GoogleMap>
        ))

        return <MyMapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb3kUA8KdYfPy1MqVsfnVU-wxHzNhpm-8"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />;
    }
}

export default graphql(denuncias)(Denuncia);

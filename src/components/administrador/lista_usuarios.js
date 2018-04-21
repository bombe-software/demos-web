import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchUsuariosAdmin from './../../queries/fetchUsuariosAdmin';

class ListaUsuarios extends Component {

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

    renderList(list){
        return _.map(list, o => {
            return (  
                <div key={o.id}>
                    {o.id}
                </div>
            );
        });
    }

    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>
        }
        return (
            <div>
                {this.renderList(this.props.data.usuarios)}
            </div>
        );
    }
}

export default graphql(fetchUsuariosAdmin)(ListaUsuarios)
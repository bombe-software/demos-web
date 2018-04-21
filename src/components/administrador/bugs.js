import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchBugs from './../../queries/fetchBugs';
import _  from 'lodash'

class Bugs extends Component {

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
            <h1 className="is-size-3 subtitle">Bugs</h1>
            return <div>Loading...</div>
        }
        return (
            <div>
                <h1 className="is-size-3 subtitle">Bugs</h1>
                {this.renderList(this.props.data.bugs)}
            </div>
        );
    }
}

export default graphql(fetchBugs)(Bugs)
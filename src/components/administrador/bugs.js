import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchBugs from './../../queries/fetchBugs';
import deleteBug from './../../mutations/deleteBug';
import _ from 'lodash'

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
    eliminarBug(id_bug){
        this.props.mutate({
            variables: { id_bug },
            optimisticResponse: {
                __typename: "Mutation",
                deleteBug: {
                    id: id_bug,
                    __typename: "BugType"
                }
            },
            update: (proxy, { data: { deleteBug } }) => {
              const data = proxy.readQuery({ query: fetchBugs });
              _.remove(data.bugs, function(n) {
                return n.id == id_bug; 
              });
              proxy.writeQuery({ query: fetchBugs, data });
            }
        })
    }

    renderList(list) {
        return _.map(list, o => {
            return (
                <tr className="full-width-row" key={o.id}>
                    <td>
                        {o.id}
                    </td>
                    <td className="has-text-right">
                        <button className="button is-danger" onClick={() => this.eliminarBug(o.id)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
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
                <table className="table full-width-row is-fullwidth">
                    <tbody>
                        {this.renderList(this.props.data.bugs)}
                    </ tbody>
                </table>
            </div>
        );
    }
}

export default graphql(deleteBug)(graphql(fetchBugs)(Bugs));
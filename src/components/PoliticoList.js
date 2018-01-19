import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchListaPoliticos';

class PoliticoList extends Component {
 
  renderPoliticos() {
    return this.props.data.politicos.map(() => {
      return (
        <li key={id} className="collection-item">
         {politicos.nombre}
        </li>
      );
    });
  }

  render() {
      console.log(this.props)
    if (this.props.data.loading) { return <div>Loading...</div>; }

    return (
      <div>
        <ul className="collection">
          {this.renderPoliticos()}
        </ul>
      </div>
    );
  }
}


export default graphql(query)(PoliticoList);
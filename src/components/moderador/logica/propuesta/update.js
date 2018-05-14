import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import modificar_propuestas from './../../../../queries/modificar_propuestas';
import patch_modificar_propuesta from './../../../../mutations/patch/update_propuesta';
import patchd_modificar_propuesta from './../../../../mutations/patchd/update_propuesta';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    aceptar(id_propuesta) {
      this.props.patch_modificar_propuesta({
        variables: {
          id_propuesta
        }
      });
    }

    denegar(id_propuesta) {
      this.props.patchd_modificar_propuesta({
        variables: {
          id_propuesta
        }
      });
    }

    render() {
      if (this.props.data.loading) return <LoadingScreen />
      return (
        <WrappedComponent
          id_usuario={this.props.id_usuario}
          tipo={'Propuesta'}
          lista={this.props.data.modificar_propuestas}
          aceptar={this.aceptar}
          denegar={this.denegar}
          {...this.props} {...this.context} />);
    }
  }
  return compose(
    graphql(modificar_propuestas, {
      name: 'data'
    }),
    graphql(patch_modificar_propuesta, {
      name: 'patch_modificar_propuesta'
    }),
    graphql(patchd_modificar_propuesta, {
      name: 'patchd_modificar_propuesta'
    })
  )(Add);
};
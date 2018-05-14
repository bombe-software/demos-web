import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import eliminar_propuestas from './../../../../queries/eliminar_propuestas';
import patch_eliminar_propuesta from './../../../../mutations/patch/delete_propuesta';
import patchd_eliminar_propuesta from './../../../../mutations/patchd/delete_propuesta';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    aceptar(id_solicituda) {
      this.props.patch_eliminar_propuesta({
        variables: {
          id_solicitud
        }
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_eliminar_propuesta({
        variables: {
          id_solicitud
        }
      });
    }

    render() {
      if (this.props.data.loading) return <LoadingScreen />
      return (
        <WrappedComponent
          id_usuario={this.props.id_usuario}
          tipo={'Propuesta'}
          lista={this.props.data.eliminar_propuestas}
          aceptar={this.aceptar}
          denegar={this.denegar}
          {...this.props} {...this.context} />);
    }
  }
  return compose(
    graphql(eliminar_propuestas, {
      name: 'data'
    }),
    graphql(patch_eliminar_propuesta, {
      name: 'patch_eliminar_propuesta'
    }),
    graphql(patchd_eliminar_propuesta, {
      name: 'patchd_eliminar_propuesta'
    })
  )(Add);
};


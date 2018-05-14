import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import modificar_eventos from './../../../../queries/modificar_eventos';
import patch_modificar_evento from './../../../../mutations/patch/update_evento';
import patchd_modificar_evento from './../../../../mutations/patchd/update_evento';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    aceptar(id_solicitud) {
      this.props.patch_modificar_evento({
        variables: {
          id_solicitud
        }
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_modificar_evento({
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
          tipo={'Evento'}
          lista={this.props.data.modificar_eventos}
          aceptar={this.aceptar}
          denegar={this.denegar}
          {...this.props} {...this.context} />);
    }
  }
  return compose(
    graphql(modificar_eventos, {
      name: 'data'
    }),
    graphql(patch_modificar_evento, {
      name: 'patch_modificar_evento'
    }),
    graphql(patchd_modificar_evento, {
      name: 'patchd_modificar_evento'
    })
  )(Add);
};



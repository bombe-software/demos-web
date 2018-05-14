import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import eliminar_eventos from './../../../../queries/eliminar_eventos';
import patch_eliminar_evento from './../../../../mutations/patch/delete_evento';
import patchd_eliminar_evento from './../../../../mutations/patchd/delete_evento';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    aceptar(id_solicitud) {
      this.props.patch_eliminar_evento({
        variables: {
          id_solicitud
        }
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_eliminar_evento({
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
          lista={this.props.data.eliminar_eventos}
          aceptar={this.aceptar}
          denegar={this.denegar}
          {...this.props} {...this.context} />);
    }
  }
  return compose(
    graphql(eliminar_eventos, {
      name: 'data'
    }),
    graphql(patch_eliminar_evento, {
      name: 'patch_eliminar_evento'
    }),
    graphql(patchd_eliminar_evento, {
      name: 'patchd_eliminar_evento'
    })
  )(Add);
};




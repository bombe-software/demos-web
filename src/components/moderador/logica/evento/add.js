import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import solicitud_eventos from './../../../../queries/solicitud_eventos';
import patch_solicitud_evento from './../../../../mutations/patch/solicitud_propuesta';
import patchd_solicitud_evento from './../../../../mutations/patchd/solicitud_propuesta';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    aceptar(id_evento) {
      this.props.patch_solicitud_evento({
        variables: {
          id_evento
        }
      });
    }

    denegar(id_evento) {
      this.props.patchd_solicitud_evento({
        variables: {
          id_evento
        }
      });
    }

    render() {
      if (this.props.data.loading) return <LoadingScreen />
      return (
        <WrappedComponent
          id_usuario={this.props.id_usuario}
          tipo={'Evento'}
          lista={this.props.data.solicitud_eventos}
          aceptar={this.aceptar}
          denegar={this.denegar}
          {...this.props} {...this.context} />);
    }
  }
  return compose(
    graphql(solicitud_eventos, {
      name: 'data'
    }),
    graphql(patch_solicitud_evento, {
      name: 'patch_solicitud_evento'
    }),
    graphql(patchd_solicitud_evento, {
      name: 'patchd_solicitud_evento'
    })
  )(Add);
};




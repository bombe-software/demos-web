import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import solicitud_eventos from './../../../../queries/solicitud_eventos';
import patch_solicitud_evento from './../../../../mutations/patch/solicitud_evento';
import patchd_solicitud_evento from './../../../../mutations/patchd/solicitud_evento';

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
        },
        optimisticResponse: {
          __typename: "Mutation",
          patch_solicitud_evento: {
            id: id_evento,
            __typename: "SolicitudEventoType"
          }
        },
        update: (proxy, { data: { patch_solicitud_evento } }) => {
          const data = proxy.readQuery({ query: solicitud_eventos });
          _.remove(data.solicitud_eventos, function (n) {
            return n.id == id_evento;
          });
          proxy.writeQuery({ query: solicitud_eventos, data });
        }
      });
    }

    denegar(id_evento) {
      this.props.patchd_solicitud_evento({
        variables: {
          id_evento
        },
        optimisticResponse: {
          __typename: "Mutation",
          patchd_solicitud_evento: {
            id: id_evento,
            __typename: "SolicitudEventoType"
          }
        },
        update: (proxy, { data: { patchd_solicitud_evento } }) => {
          const data = proxy.readQuery({ query: solicitud_eventos });
          _.remove(data.solicitud_eventos, function (n) {
            return n.id == id_evento;
          });
          proxy.writeQuery({ query: solicitud_eventos, data });
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




import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import solicitud_propuestas from './../../../../queries/solicitud_propuestas';
import patch_solicitud_propuesta from './../../../../mutations/patch/solicitud_propuesta';
import patchd_solicitud_propuesta from './../../../../mutations/patchd/solicitud_propuesta';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    aceptar(id_propuesta) {
      this.props.patch_solicitud_propuesta({
        variables: {
          id_propuesta
        },
        optimisticResponse: {
          __typename: "Mutation",
          patch_solicitud_propuesta: {
            id: id_propuesta,
            __typename: "SolicitudPropuestaType"
          }
        },
        update: (proxy, { data: { patch_solicitud_propuesta } }) => {
          const data = proxy.readQuery({ query: solicitud_propuestas });
          _.remove(data.solicitud_propuestas, function (n) {
            return n.id == id_propuesta;
          });
          proxy.writeQuery({ query: solicitud_propuestas, data });
        }
      });
    }

    denegar(id_propuesta) {
      this.props.patchd_solicitud_propuesta({
        variables: {
          id_propuesta
        },
        optimisticResponse: {
          __typename: "Mutation",
          patchd_solicitud_propuesta: {
            id: id_propuesta,
            __typename: "SolicitudPropuestaType"
          }
        },
        update: (proxy, { data: { patchd_solicitud_propuesta } }) => {
          const data = proxy.readQuery({ query: solicitud_propuestas });
          _.remove(data.solicitud_propuestas, function (n) {
            return n.id == id_propuesta;
          });
          proxy.writeQuery({ query: solicitud_propuestas, data });
        }
      });
    }

    render() {
      if (this.props.data.loading) return <LoadingScreen />
      return (
        <WrappedComponent
          id_usuario={this.props.id_usuario}
          tipo={'Propuesta'}
          lista={this.props.data.solicitud_propuestas}
          aceptar={this.aceptar}
          denegar={this.denegar}
          {...this.props} {...this.context} />);
    }
  }
  return compose(
    graphql(solicitud_propuestas, {
      name: 'data'
    }),
    graphql(patch_solicitud_propuesta, {
      name: 'patch_solicitud_propuesta'
    }),
    graphql(patchd_solicitud_propuesta, {
      name: 'patchd_solicitud_propuesta'
    })
  )(Add);
};


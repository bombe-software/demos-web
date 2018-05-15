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

    aceptar(id_solicitud) {
      this.props.patch_eliminar_propuesta({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patch_eliminar_propuesta: {
            id: id_solicitud,
            __typename: "EliminarPropuestaType"
          }
        },
        update: (proxy, { data: { patch_eliminar_propuesta } }) => {
          const data = proxy.readQuery({ query: eliminar_propuestas });
          _.remove(data.eliminar_propuestas, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: eliminar_propuestas, data });
        }
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_eliminar_propuesta({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patchd_eliminar_propuesta: {
            id: id_solicitud,
            __typename: "EliminarPropuestaType"
          }
        },
        update: (proxy, { data: { patchd_eliminar_propuesta } }) => {
          const data = proxy.readQuery({ query: eliminar_propuestas });
          _.remove(data.eliminar_propuestas, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: eliminar_propuestas, data });
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


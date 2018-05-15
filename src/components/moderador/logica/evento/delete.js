import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import eliminar_eventos from './../../../../queries/eliminar_eventos';
import patch_eliminar_evento from './../../../../mutations/patch/delete_evento';
import patchd_eliminar_evento from './../../../../mutations/patchd/delete_evento';
import suscribe_to_evento_delete from './../../../../suscriptions/delete/evento';
import suscribe_to_patchd_evento_delete from './../../../../suscriptions/patchd/delete_evento';
import suscribe_to_patch_evento_delete from './../../../../suscriptions/patch_moderador/delete_evento';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    componentDidMount() {
      this.createDeleteSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_evento_delete,
        updateQuery: (previousState, {subscriptionData}) => {
          if (!subscriptionData.data) return previousState;
          const newEvento = subscriptionData.data.suscribe_to_evento_delete;
          let n_eliminar_eventos = [newEvento, ...previousState.eliminar_eventos];
          return Object.assign({}, previousState, {
            eliminar_eventos: n_eliminar_eventos
          });
        },
        onError: (err) => console.error(err),
      });
      this.createPatchSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_patch_evento_delete,
        updateQuery: (previousState, {subscriptionData}) => {
          if (!subscriptionData.data) return previousState;
          const newEvento = subscriptionData.data.suscribe_to_patch_evento_delete;
          let n_eliminar_eventos = [...previousState.eliminar_eventos];
          _.remove(n_eliminar_eventos, function(o) {
            return newEvento.id == o.id;
          });
          return Object.assign({}, previousState, {
            eliminar_eventos: n_eliminar_eventos
          });
        },
        onError: (err) => console.error(err),
      });
    }

    componentWillUnmount(){
      this.createDeleteSubscription();
      this.createPatchDSubscription();
      this.createPatchSubscription();
    }

    aceptar(id_solicitud) {
      this.props.patch_eliminar_evento({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patch_eliminar_evento: {
            id: id_solicitud,
            __typename: "EliminarEventoType"
          }
        },
        update: (proxy, { data: { patch_eliminar_evento } }) => {
          const data = proxy.readQuery({ query: eliminar_eventos });
          _.remove(data.eliminar_eventos, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: eliminar_eventos, data });
        }
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_eliminar_evento({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patchd_eliminar_evento: {
            id: id_solicitud,
            __typename: "EliminarEventoType"
          }
        },
        update: (proxy, { data: { patchd_eliminar_evento } }) => {
          const data = proxy.readQuery({ query: eliminar_eventos });
          _.remove(data.eliminar_eventos, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: eliminar_eventos, data });
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




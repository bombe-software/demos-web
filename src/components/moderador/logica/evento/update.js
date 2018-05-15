import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import modificar_eventos from './../../../../queries/modificar_eventos';
import patch_modificar_evento from './../../../../mutations/patch/update_evento';
import patchd_modificar_evento from './../../../../mutations/patchd/update_evento';
import suscribe_to_evento_update from './../../../../suscriptions/update/evento';
import suscribe_to_patchd_evento_update from './../../../../suscriptions/patchd/update_evento';
import suscribe_to_patch_evento_update from './../../../../suscriptions/patch_moderador/update_evento';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    componentDidMount() {
      this.createUpdateSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_evento_update,
        updateQuery: (previousState, {subscriptionData}) => {
          if (!subscriptionData.data) return previousState;
          const newEvento = subscriptionData.data.suscribe_to_evento_update;
          let n_modificar_eventos = [newEvento, ...previousState.modificar_eventos];
          return Object.assign({}, previousState, {
            modificar_eventos: n_modificar_eventos
          });
        },
        onError: (err) => console.error(err),
      });
      this.createPatchDSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_patchd_evento_update,
        updateQuery: (previousState, {subscriptionData}) => {
          if (!subscriptionData.data) return previousState;
          const newEvento = subscriptionData.data.suscribe_to_patchd_evento_update;
          let n_modificar_eventos = [...previousState.modificar_eventos];
          _.remove(n_modificar_eventos, function(o) {
            return newEvento.id == o.id;
          });
          return Object.assign({}, previousState, {
            modificar_eventos: n_modificar_eventos
          });
        },
        onError: (err) => console.error(err),
      });
      this.createPatchSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_patch_evento_update,
        updateQuery: (previousState, {subscriptionData}) => {
          if (!subscriptionData.data) return previousState;
          const newEvento = subscriptionData.data.suscribe_to_patch_evento_update_moderador;
          let n_modificar_eventos = [...previousState.modificar_eventos];
          _.remove(n_modificar_eventos, function(o) {
            return newEvento.id == o.id;
          });
          return Object.assign({}, previousState, {
            modificar_eventos: n_modificar_eventos
          });
        },
        onError: (err) => console.error(err),
      });
    }

    componentWillUnmount(){
      this.createUpdateSubscription();
      this.createPatchDSubscription();
      this.createPatchSubscription();
    }

    aceptar(id_solicitud) {
      this.props.patch_modificar_evento({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patch_modificar_evento: {
            id: id_solicitud,
            __typename: "ModificarEventoType"
          }
        },
        update: (proxy, { data: { patch_modificar_evento } }) => {
          const data = proxy.readQuery({ query: modificar_eventos });
          _.remove(data.modificar_eventos, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: modificar_eventos, data });
        }
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_modificar_evento({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patchd_modificar_evento: {
            id: id_solicitud,
            __typename: "ModificarEventoType"
          }
        },
        update: (proxy, { data: { patchd_modificar_evento } }) => {
          const data = proxy.readQuery({ query: modificar_eventos });
          _.remove(data.modificar_eventos, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: modificar_eventos, data });
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



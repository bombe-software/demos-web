import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';
import _ from 'lodash';

import solicitud_eventos from './../../../../queries/solicitud_eventos';
import patch_solicitud_evento from './../../../../mutations/patch/solicitud_evento';
import patchd_solicitud_evento from './../../../../mutations/patchd/solicitud_evento';

import LoadingScreen from './../../../reutilizables/loading_screen';

import suscribe_to_evento_add from './../../../../suscriptions/add/evento';
import suscribe_to_patchd_evento_add from './../../../../suscriptions/patchd/solicitud_evento';
import suscribe_to_patch_evento_add_moderador from './../../../../suscriptions/patch_moderador/solicitud_evento';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this);
    }


    componentWillMount() {
      if (!this.createAddSubscription) {
        this.createAddSubscription = this.props.data.subscribeToMore({
          document: suscribe_to_evento_add,
          updateQuery: (previousState, { subscriptionData }) => {
            if (!subscriptionData.data) return previousState;
            const newEvento = subscriptionData.data.suscribe_to_evento_add;
            let n_solicitud_eventos = [newEvento, ...previousState.solicitud_eventos];
            return Object.assign({}, previousState, {
              solicitud_eventos: n_solicitud_eventos
            });
          },
          onError: (err) => console.error(err),
        });
      }
      if (!this.createPatchDSubscription) {
        this.createPatchDSubscription = this.props.data.subscribeToMore({
          document: suscribe_to_patchd_evento_add,
          updateQuery: (previousState, { subscriptionData }) => {
            if (!subscriptionData.data) return previousState;
            const newEvento = subscriptionData.data.suscribe_to_patchd_evento_add;
            let n_solicitud_eventos = [...previousState.solicitud_eventos];
            _.remove(n_solicitud_eventos, function (o) {
              return newEvento.id == o.id;
            });
            return Object.assign({}, previousState, {
              solicitud_eventos: n_solicitud_eventos
            });
          },
          onError: (err) => console.error(err),
        });
      }
      if (!this.createPatchSubscription) {
        this.createPatchSubscription = this.props.data.subscribeToMore({
          document: suscribe_to_patch_evento_add_moderador,
          updateQuery: (previousState, { subscriptionData }) => {
            if (!subscriptionData.data) return previousState;
            const newEvento = subscriptionData.data.suscribe_to_patch_evento_add_moderador;
            let n_solicitud_eventos = [...previousState.solicitud_eventos];
            _.remove(n_solicitud_eventos, function (o) {
              return newEvento.id == o.id;
            });
            return Object.assign({}, previousState, {
              solicitud_eventos: n_solicitud_eventos
            });
          },
          onError: (err) => console.error(err),
        });
      }

    }

    componentWillUnmount() {
      if (this.createAddSubscription) this.createAddSubscription();
      if (this.createPatchDSubscription) this.createPatchDSubscription();
      if (this.createPatchSubscription) this.createPatchSubscription();
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




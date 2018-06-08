import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';
import _ from 'lodash';

import modificar_propuestas from './../../../../queries/modificar_propuestas';
import patch_modificar_propuesta from './../../../../mutations/patch/update_propuesta';
import patchd_modificar_propuesta from './../../../../mutations/patchd/update_propuesta';
import suscribe_to_propuesta_update from './../../../../suscriptions/update/propuesta';
import suscribe_to_patchd_propuesta_update from './../../../../suscriptions/patchd/update_propuesta';
import suscribe_to_patch_propuesta_update from './../../../../suscriptions/patch_moderador/update_propuesta';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    componentWillMount() {
      if (!this.createUpdateSubscription) {
        this.createUpdateSubscription = this.props.data.subscribeToMore({
          document: suscribe_to_propuesta_update,
          updateQuery: (previousState, { subscriptionData }) => {
            if (!subscriptionData.data) return previousState;
            const newPropuesta = subscriptionData.data.suscribe_to_propuesta_update;
            let n_modificar_propuestas = [newPropuesta, ...previousState.modificar_propuestas];
            return Object.assign({}, previousState, {
              modificar_propuestas: n_modificar_propuestas
            });
          },
          onError: (err) => console.error(err),
        });
      }
      if (!this.createPatchDSubscription) {
        this.createPatchDSubscription = this.props.data.subscribeToMore({
          document: suscribe_to_patchd_propuesta_update,
          updateQuery: (previousState, { subscriptionData }) => {
            if (!subscriptionData.data) return previousState;
            const newPropuesta = subscriptionData.data.suscribe_to_patchd_propuesta_update;
            let n_modificar_propuestas = [...previousState.modificar_propuestas];
            _.remove(n_modificar_propuestas, function (o) {
              return newPropuesta.id == o.id;
            });
            return Object.assign({}, previousState, {
              modificar_propuestas: n_modificar_propuestas
            });
          },
          onError: (err) => console.error(err),
        });
      }
      if (!this.createPatchSubscription) {
        this.createPatchSubscription = this.props.data.subscribeToMore({
          document: suscribe_to_patch_propuesta_update,
          updateQuery: (previousState, { subscriptionData }) => {
            if (!subscriptionData.data) return previousState;
            const newPropuesta = subscriptionData.data.suscribe_to_patch_propuesta_update_moderador;
            let n_modificar_propuestas = [...previousState.modificar_propuestas];
            _.remove(n_modificar_propuestas, function (o) {
              return newPropuesta.id == o.id;
            });
            return Object.assign({}, previousState, {
              modificar_propuestas: n_modificar_propuestas
            });
          },
          onError: (err) => console.error(err),
        });
      }
    }

    componentWillUnmount() {
      if (this.createUpdateSubscription) this.createUpdateSubscription();
      if (this.createPatchDSubscription) this.createPatchDSubscription();
      if (this.createPatchSubscription) this.createPatchSubscription();
    }

    aceptar(id_solicitud) {
      this.props.patch_modificar_propuesta({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patch_modificar_propuesta: {
            id: id_solicitud,
            __typename: "ModificarPropuestaType"
          }
        },
        update: (proxy, { data: { patch_modificar_propuesta } }) => {
          const data = proxy.readQuery({ query: modificar_propuestas });
          _.remove(data.modificar_propuestas, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: modificar_propuestas, data });
        }
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_modificar_propuesta({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patchd_modificar_propuesta: {
            id: id_solicitud,
            __typename: "ModificarPropuestaType"
          }
        },
        update: (proxy, { data: { patchd_modificar_propuesta } }) => {
          const data = proxy.readQuery({ query: modificar_propuestas });
          _.remove(data.modificar_propuestas, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: modificar_propuestas, data });
        }
      });
    }

    render() {
      if (this.props.data.loading) return <LoadingScreen />
      return (
        <WrappedComponent
          id_usuario={this.props.id_usuario}
          tipo={'Propuesta'}
          lista={this.props.data.modificar_propuestas}
          aceptar={this.aceptar}
          denegar={this.denegar}
          {...this.props} {...this.context} />);
    }
  }
  return compose(
    graphql(modificar_propuestas, {
      name: 'data'
    }),
    graphql(patch_modificar_propuesta, {
      name: 'patch_modificar_propuesta'
    }),
    graphql(patchd_modificar_propuesta, {
      name: 'patchd_modificar_propuesta'
    })
  )(Add);
};
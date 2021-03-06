import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';
import _ from 'lodash';

import modificar_politicos from './../../../../queries/modificar_politicos';
import patch_modificar_politico from './../../../../mutations/patch/update_politico';
import patchd_modificar_politico from './../../../../mutations/patchd/update_politico';
import politico from "./../../../../queries/politico";
import suscribe_to_politico_update from './../../../../suscriptions/update/politico';
import suscribe_to_patchd_politico_update from './../../../../suscriptions/patchd/update_politico';
import suscribe_to_patch_politico_update from './../../../../suscriptions/patch_moderador/update_politico';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    componentWillMount() {
      this.createUpdateSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_politico_update,
        updateQuery: (previousState, { subscriptionData }) => {
          if (!subscriptionData.data) return previousState;
          const newPolitico = subscriptionData.data.suscribe_to_politico_update;
          let n_modificar_politicos = [newPolitico, ...previousState.modificar_politicos];
          return Object.assign({}, previousState, {
            modificar_politicos: n_modificar_politicos
          });
        },
        onError: (err) => console.error(err),
      });
      this.createPatchDSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_patchd_politico_update,
        updateQuery: (previousState, { subscriptionData }) => {
          if (!subscriptionData.data) return previousState;
          const newPolitico = subscriptionData.data.suscribe_to_patchd_politico_update;
          let n_modificar_politicos = [...previousState.modificar_politicos];
          _.remove(n_modificar_politicos, function (o) {
            return newPolitico.id == o.id;
          });
          return Object.assign({}, previousState, {
            modificar_politicos: n_modificar_politicos
          });
        },
        onError: (err) => console.error(err),
      });
      this.createPatchSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_patch_politico_update,
        updateQuery: (previousState, { subscriptionData }) => {
          if (!subscriptionData.data) return previousState;
          const newPolitico = subscriptionData.data.suscribe_to_patch_politico_update_moderador;
          let n_modificar_politicos = [...previousState.modificar_politicos];
          _.remove(n_modificar_politicos, function (o) {
            return newPolitico.id == o.id;
          });
          return Object.assign({}, previousState, {
            modificar_politicos: n_modificar_politicos
          });
        },
        onError: (err) => console.error(err),
      });
    }

    componentWillUnmount() {
      if(this.createUpdateSubscription) this.createUpdateSubscription();
      if(this.createPatchDSubscription) this.createPatchDSubscription();
      if(this.createPatchSubscription ) this.createPatchSubscription();
    }

    aceptar(id_solicitud, id) {
      this.props.patch_modificar_politico({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patch_modificar_politico: {
            id: id_solicitud,
            __typename: "ModificarPoliticoType"
          }
        },
        update: (proxy, { data: { patch_modificar_politico } }) => {
          const data = proxy.readQuery({ query: modificar_politicos });
          _.remove(data.modificar_politicos, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: modificar_politicos, data });
        },
        refetchQueries: [{
          query: politico,
          variables: { id }
        }]
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_modificar_politico({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patchd_modificar_politico: {
            id: id_solicitud,
            __typename: "ModificarPoliticoType"
          }
        },
        update: (proxy, { data: { patchd_modificar_politico } }) => {
          const data = proxy.readQuery({ query: modificar_politicos });
          _.remove(data.modificar_politicos, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: modificar_politicos, data });
        }
      });
    }

    render() {
      if (this.props.data.loading) return <LoadingScreen />
      return (
        <WrappedComponent
          id_usuario={this.props.id_usuario}
          tipo={'Politico'}
          lista={this.props.data.modificar_politicos}
          aceptar={this.aceptar}
          denegar={this.denegar}
          {...this.props} {...this.context} />);
    }
  }
  return compose(
    graphql(modificar_politicos, {
      name: 'data'
    }),
    graphql(patch_modificar_politico, {
      name: 'patch_modificar_politico'
    }),
    graphql(patchd_modificar_politico, {
      name: 'patchd_modificar_politico'
    })
  )(Add);
};




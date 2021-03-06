import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';
import _ from 'lodash';

import eliminar_politicos from './../../../../queries/eliminar_politicos';
import patch_eliminar_politico from './../../../../mutations/patch/delete_politico';
import patchd_eliminar_politico from './../../../../mutations/patchd/delete_politico';
import suscribe_to_politico_delete from './../../../../suscriptions/delete/politico';
import suscribe_to_patch_politico_delete_moderador from './../../../../suscriptions/patchd/delete_politico';
import suscribe_to_patchd_politico_delete from './../../../../suscriptions/patch_moderador/delete_politico';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    componentWillMount() {
      if(!this.createDeleteSubscription){
        this.createDeleteSubscription = this.props.data.subscribeToMore({
          document: suscribe_to_politico_delete,
          updateQuery: (previousState, {subscriptionData}) => {
            if (!subscriptionData.data) return previousState;
            const newPolitico = subscriptionData.data.suscribe_to_politico_delete;
            let n_eliminar_politicos = [newPolitico, ...previousState.eliminar_politicos];
            return Object.assign({}, previousState, {
              eliminar_politicos: n_eliminar_politicos
            });
          },
          onError: (err) => console.error(err),
        });
      }
      if(!this.createPatchSubscription){
        this.createPatchSubscription = this.props.data.subscribeToMore({
          document: suscribe_to_patch_politico_delete_moderador,
          updateQuery: (previousState, {subscriptionData}) => {
            if (!subscriptionData.data) return previousState;
            const newPolitico= subscriptionData.data.suscribe_to_patch_politico_delete_moderador;
            let n_eliminar_politicos = [...previousState.eliminar_politicos];
            _.remove(n_eliminar_politicos, function(o) {
              return newPolitico.id == o.id;
            });
            return Object.assign({}, previousState, {
              eliminar_politicos: n_eliminar_politicos
            });
          },
          onError: (err) => console.error(err),
        });
      }
      if(!this.createPatchDSubscription){
        this.createPatchDSubscription = this.props.data.subscribeToMore({
          document: suscribe_to_patchd_politico_delete,
          updateQuery: (previousState, {subscriptionData}) => {
            if (!subscriptionData.data) return previousState;
            const newPolitico= subscriptionData.data.suscribe_to_patchd_politico_delete;
            let n_eliminar_politicos = [...previousState.eliminar_politicos];
            _.remove(n_eliminar_politicos, function(o) {
              return newPolitico.id == o.id;
            });
            return Object.assign({}, previousState, {
              eliminar_politicos: n_eliminar_politicos
            });
          },
          onError: (err) => console.error(err),
        });
      }
    }

    componentWillUnmount() {
      if(this.createDeleteSubscription) this.createDeleteSubscription();
      if(this.createPatchDSubscription) this.createPatchDSubscription();
      if(this.createPatchSubscription ) this.createPatchSubscription();
    }


    aceptar(id_solicitud) {
      this.props.patch_eliminar_politico({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patch_eliminar_politico: {
            id: id_solicitud,
            __typename: "EliminarPoliticoType"
          }
        },
        update: (proxy, { data: { patch_eliminar_politico } }) => {
          const data = proxy.readQuery({ query: eliminar_politicos });
          _.remove(data.eliminar_politicos, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: eliminar_politicos, data });
        }
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_eliminar_politico({
        variables: {
          id_solicitud
        },
        optimisticResponse: {
          __typename: "Mutation",
          patchd_eliminar_politico: {
            id: id_solicitud,
            __typename: "EliminarPoliticoType"
          }
        },
        update: (proxy, { data: { patchd_eliminar_politico } }) => {
          const data = proxy.readQuery({ query: eliminar_politicos });
          _.remove(data.eliminar_politicos, function (n) {
            return n.id == id_solicitud;
          });
          proxy.writeQuery({ query: eliminar_politicos, data });
        }
      });
    }

    render() {
      if (this.props.data.loading) return <LoadingScreen />
      return (
        <WrappedComponent
          id_usuario={this.props.id_usuario}
          tipo={'Politico'}
          lista={this.props.data.eliminar_politicos}
          aceptar={this.aceptar}
          denegar={this.denegar}
          {...this.props} {...this.context} />);
    }
  }
  return compose(
    graphql(eliminar_politicos, {
      name: 'data'
    }),
    graphql(patch_eliminar_politico, {
      name: 'patch_eliminar_politico'
    }),
    graphql(patchd_eliminar_politico, {
      name: 'patchd_eliminar_politico'
    })
  )(Add);
};




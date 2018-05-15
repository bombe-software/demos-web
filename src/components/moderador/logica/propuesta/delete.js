import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import eliminar_propuestas from './../../../../queries/eliminar_propuestas';
import patch_eliminar_propuesta from './../../../../mutations/patch/delete_propuesta';
import patchd_eliminar_propuesta from './../../../../mutations/patchd/delete_propuesta';
import suscribe_to_propuesta_delete from './../../../../suscriptions/delete/propuesta';
import suscribe_to_patchd_propuesta_delete from './../../../../suscriptions/patchd/delete_propuesta';
import suscribe_to_patch_propuesta_delete from './../../../../suscriptions/patch_moderador/delete_propuesta';

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
        document: suscribe_to_propuesta_delete,
        updateQuery: (previousState, {subscriptionData}) => {
          if (!subscriptionData.data) return previousState;
          const newPropuesta = subscriptionData.data.suscribe_to_propuesta_delete;
          let n_eliminar_propuestas = [newPropuesta, ...previousState.eliminar_propuestas];
          return Object.assign({}, previousState, {
            eliminar_propuestas: n_eliminar_propuestas
          });
        },
        onError: (err) => console.error(err),
      });
      this.createPatchDSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_patchd_propuesta_delete,
        updateQuery: (previousState, {subscriptionData}) => {
          if (!subscriptionData.data) return previousState;
          const newPropuesta = subscriptionData.data.suscribe_to_patchd_propuesta_delete;
          let n_eliminar_propuestas = [...previousState.eliminar_propuestas];
          _.remove(n_eliminar_propuestas, function(o) {
            return newPropuesta.id == o.id;
          });
          return Object.assign({}, previousState, {
            eliminar_propuestas: n_eliminar_propuestas
          });
        },
        onError: (err) => console.error(err),
      });
      this.createPatchSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_patch_propuesta_delete,
        updateQuery: (previousState, {subscriptionData}) => {
          if (!subscriptionData.data) return previousState;
          const newPropuesta = subscriptionData.data.suscribe_to_patch_propuesta_delete_moderador;
          let n_eliminar_propuestas = [...previousState.eliminar_propuestas];
          _.remove(n_eliminar_propuestas, function(o) {
            return newPropuesta.id == o.id;
          });
          return Object.assign({}, previousState, {
            eliminar_propuestas: n_eliminar_propuestas
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


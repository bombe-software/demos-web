import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import solicitud_politicos from './../../../../queries/solicitud_politicos';
import patch_solicitud_politico from './../../../../mutations/patch/solicitud_politico';
import patchd_solicitud_politico from './../../../../mutations/patchd/solicitud_politico';

import LoadingScreen from './../../../reutilizables/loading_screen';
import suscribe_to_politico_add from './../../../../suscriptions/add/politico';
export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    componentDidMount() {
      this.createAddSubscription = this.props.data.subscribeToMore({
        document: suscribe_to_politico_add,
        updateQuery: (previousState, {subscriptionData}) => {
          if (!subscriptionData.data) return previousState;
          const newPolitico = subscriptionData.data.suscribe_to_politico_add
          const n_solicitud_politicos = [newPolitico, ...previousState.solicitud_politicos]
          return Object.assign({}, previousState, {
            solicitud_politicos: n_solicitud_politicos
          });
        },
        onError: (err) => console.error(err),
      })
    }



    aceptar(id_politico) {
      this.props.patch_solicitud_politico({
        variables: {
          id_politico
        },
        optimisticResponse: {
          __typename: "Mutation",
          patch_solicitud_politico: {
            id: id_politico,
            __typename: "SolicitudPoliticoType"
          }
        },
        update: (proxy, { data: { patch_solicitud_politico } }) => {
          const data = proxy.readQuery({ query: solicitud_politicos });
          _.remove(data.solicitud_politicos, function (n) {
            return n.id == id_politico;
          });
          proxy.writeQuery({ query: solicitud_politicos, data });
        }
      });
    }

    denegar(id_politico) {
      this.props.patchd_solicitud_politico({
        variables: {
          id_politico
        },
        optimisticResponse: {
          __typename: "Mutation",
          patchd_solicitud_politico: {
            id: id_politico,
            __typename: "SolicitudPoliticoType"
          }
        },
        update: (proxy, { data: { patchd_solicitud_politico } }) => {
          const data = proxy.readQuery({ query: solicitud_politicos });
          _.remove(data.solicitud_politicos, function (n) {
            return n.id == id_politico;
          });
          proxy.writeQuery({ query: solicitud_politicos, data });
        }
      });
    }

    render() {
      if (this.props.data.loading) return <LoadingScreen />
      return (
        <WrappedComponent
          id_usuario={this.props.id_usuario}
          tipo={'Politico'}
          lista={this.props.data.solicitud_politicos}
          aceptar={this.aceptar}
          denegar={this.denegar}
          {...this.props} {...this.context} />);
    }
  }
  return compose(
    graphql(solicitud_politicos, {
      name: 'data'
    }),
    graphql(patch_solicitud_politico, {
      name: 'patch_solicitud_politico'
    }),
    graphql(patchd_solicitud_politico, {
      name: 'patchd_solicitud_politico'
    })
  )(Add);
};




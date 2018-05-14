import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import eliminar_politicos from './../../../../queries/eliminar_politicos';
import patch_eliminar_politico from './../../../../mutations/patch/delete_politico';
import patchd_eliminar_politico from './../../../../mutations/patchd/delete_politico';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    aceptar(id_solicitud) {
      this.props.patch_eliminar_politico({
        variables: {
          id_solicitud
        }
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_eliminar_politico({
        variables: {
          id_solicitud
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




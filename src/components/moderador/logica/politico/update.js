import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import modificar_politicos from './../../../../queries/modificar_politicos';
import patch_modificar_politico from './../../../../mutations/patch/update_politico';
import patchd_modificar_politico from './../../../../mutations/patchd/update_politico';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    aceptar(id_solicitud) {
      this.props.patch_modificar_politico({
        variables: {
          id_solicitud
        }
      });
    }

    denegar(id_solicitud) {
      this.props.patchd_modificar_politico({
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




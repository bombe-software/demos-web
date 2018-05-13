import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import solicitud_politicos from './../../../../queries/solicitud_politicos';
import patch_solicitud_politico from './../../../../mutations/patch/solicitud_propuesta';
import patchd_solicitud_politico from './../../../../mutations/patchd/solicitud_propuesta';

import LoadingScreen from './../../../reutilizables/loading_screen';

export default (WrappedComponent) => {
  class Add extends Component {
    constructor(props) {
      super(props);
      this.aceptar = this.aceptar.bind(this);
      this.denegar = this.denegar.bind(this)
    }

    aceptar(id_politico) {
      this.props.patch_solicitud_politico({
        variables: {
          id_politico
        }
      });
    }

    denegar(id_politico) {
      this.props.patchd_solicitud_politico({
        variables: {
          id_politico
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




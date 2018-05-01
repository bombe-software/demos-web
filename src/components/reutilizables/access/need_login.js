import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import usuario_in from './../../../queries/usuario_in.access';

export default (WrappedComponent) => {
  class NeedLogin extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        this.props.history.push('/not_found');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(usuario_in)(NeedLogin);
};
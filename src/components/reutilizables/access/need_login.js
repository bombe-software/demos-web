import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import usuario_in from './../../../queries/usuario_in.access';
import LoadingScreen from './../loading_screen';

export default (WrappedComponent, tipo) => {
  if (!tipo) {
    class NeedLogin extends Component {
      componentWillUpdate(nextProps) {
        if (!nextProps.data.loading && !nextProps.data.usuario_in) {
          this.props.history.push('/need_login');
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    return graphql(usuario_in)(NeedLogin);
  } else if (tipo == "moderador") {
    class NeedLogin extends Component {
      componentWillUpdate(nextProps) {
        if (!nextProps.data.loading && !nextProps.data.usuario_in) {
          this.props.history.push('/need_login');
        } else {
          if (nextProps.data.usuario_in.tipo_usuario.tipo != "Moderador") {
            this.props.history.push('/need_login');
          }
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return graphql(usuario_in)(NeedLogin);
  }
  else if (tipo == "administrador") {
    class NeedLogin extends Component {
      componentWillUpdate(nextProps) {
        if (!nextProps.data.loading && !nextProps.data.usuario_in) {
          this.props.history.push('/need_login');
        } else {
          if (nextProps.data.usuario_in.tipo_usuario.tipo != "Administrador") {
            this.props.history.push('/need_login');
          }
        }
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    return graphql(usuario_in)(NeedLogin);
  }
  else if (tipo == "variable") {
    class NeedLogin extends Component {
      render() {
        if (this.props.data.loading) {
          return <LoadingScreen />;
        }
        if (!this.props.data.usuario_in) {
          return <WrappedComponent
            id_usuario={null}
            {...this.props} {...this.context} />;
        } else {
          return <WrappedComponent
            id_usuario={this.props.data.usuario_in.id}
            {...this.props} {...this.context} />;
        }
      }
    }
    return graphql(usuario_in)(NeedLogin);
  }
};
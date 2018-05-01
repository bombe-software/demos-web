import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import usuario_in from './../../../queries/usuario_in.access';

export default (WrappedComponent, tipo) => {
  if(!tipo){
    class NeedLogin extends Component {
      componentWillUpdate(nextProps) {
        if (!nextProps.data.loading && !nextProps.data.usuario_in) {
          this.props.history.push('/not_found');
        }
      }
  
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    return graphql(usuario_in)(NeedLogin);
  }else if(tipo == "moderador"){
    class NeedLogin extends Component {
      componentWillUpdate(nextProps) {
        if (!nextProps.data.loading && !nextProps.data.usuario_in) {
          this.props.history.push('/not_found');
        }else{
          if (nextProps.data.usuario_in.tipo_usuario.tipo != "Moderador") {
            this.props.history.push('/not_found');
          }
        }
      }
  
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  
    return graphql(usuario_in)(NeedLogin);
  }
  else if(tipo == "administrador"){
    class NeedLogin extends Component {
      componentWillUpdate(nextProps) {
        if (!nextProps.data.loading && !nextProps.data.usuario_in) {
          this.props.history.push('/not_found');
        }else{
          if (nextProps.data.usuario_in.tipo_usuario.tipo != "Administrador") {
            this.props.history.push('/not_found');
          }
        }
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    return graphql(usuario_in)(NeedLogin);
  }
};
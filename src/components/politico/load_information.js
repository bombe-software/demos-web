import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import LoadingScreen from './../reutilizables/loading_screen';

import politico from './../../queries/politico.load_information';
import update_politico from './../../mutations/update/politico';

import propuesta from './../../queries/propuesta.load_information';
import update_propuesta from './../../mutations/update/propuesta';

import evento from './../../queries/evento.load_information';
import update_evento from './../../mutations/update/evento';

export function LoadInformationPolitico(WrappedComponent) {
  class LoadInformation extends Component {
    constructor(props) {
      super(props);
      this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleUpdate({ variables }) {
      this.props.mutate({ variables })
    }
    render() {
      if (this.props.data.loading) {
        return <LoadingScreen />;
      }
      return <WrappedComponent
        o={{
          politico: {
            id: this.props.data.politico.id,
            nombre: this.props.data.politico.nombre,
            partido: this.props.data.politico.partido.id,
            estado: this.props.data.politico.estado.id,
            cargo: this.props.data.politico.cargo,
            grado_academico: this.props.data.politico.estudios[0].grado_academico.id,
            lugar_estudio: this.props.data.politico.estudios[0].lugar_estudio.id,
            titulo: this.props.data.politico.estudios[0].titulo,
            estudios: this.props.data.politico.estudios[0].id
          },
          mutate: this.handleUpdate
        }}
        {...this.props} {...this.context} />;

    }
  }
  return graphql(update_politico)(graphql(politico, {
    options: (props) => { return { variables: { id: props.match.params.id } } }
  })(LoadInformation));
}
export function LoadInformationPropuesta(WrappedComponent) {
  class LoadInformation extends Component {
    constructor(props) {
      super(props);
      super(props);
      this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate({ variables }) {
      this.props.mutate({ variables })
    }

    render() {
      if (this.props.data.loading) {
        return <LoadingScreen />;
      }
      return <WrappedComponent
        o={{
          propuesta: {
            id: this.props.data.propuesta.id,
            titulo: this.props.data.propuesta.titulo,
            descripcion: this.props.data.propuesta.descripcion,
            tipo_propuesta: this.props.data.propuesta.tipo_propuesta.id,
            fecha: this.props.data.propuesta.fecha,
            politico: this.props.data.propuesta.politico
          },
          mutate: this.handleUpdate
        }}
        {...this.props} {...this.context} />;
    }
  }
  return graphql(update_propuesta)(graphql(propuesta, {
    options: (props) => { return { variables: { id: props.match.params.id } } }
  })(LoadInformation));
};

export function LoadInformationEvento(WrappedComponent) {
  class LoadInformation extends Component {
    constructor(props) {
      super(props);
      this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate({ variables }) {
      this.props.mutate({ variables })
    }

    render() {
      if (this.props.data.loading) {
        return <LoadingScreen />;
      }
      return <WrappedComponent
        o={{
          evento: {
            id: this.props.data.evento.id,
            titulo: this.props.data.evento.titulo,
            descripcion: this.props.data.evento.descripcion,
            fecha: this.props.data.evento.fecha,
            politico: this.props.data.evento.politico
          },
          mutate: this.handleUpdate
        }}
        {...this.props} {...this.context} />;
    }
  }
  return graphql(update_evento)(graphql(evento, {
    options: (props) => { return { variables: { id: props.match.params.id } } }
  })(LoadInformation));
};

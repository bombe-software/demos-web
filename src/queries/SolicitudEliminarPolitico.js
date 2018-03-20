import gql from 'graphql-tag';

export default gql`
query SolicitudEliminarPolitico($id: ID!) {
  solicitudEliminarPolitico(id: $id) {
    id
    titulo
    descripcion
    usuario {
      id
      nombre
      avatar
    }
    fecha
    referencia
    politico {
      id
      nombre
      cargo
    }
  }
}
`;
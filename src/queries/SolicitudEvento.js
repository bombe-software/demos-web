import gql from 'graphql-tag';

export default gql`
query SolicitudEvento($id: ID!) {
  SolicitudEvento(id: $id) {
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
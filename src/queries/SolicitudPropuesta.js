import gql from 'graphql-tag';

export default gql`
query SolicitudPropuesta($id: ID!) {
  solicitudPropuesta(id: $id) {
    id
    titulo
    descripcion
    usuario {
      id
      nombre
      avatar
    }
    tipo_propuesta{
      id
      tipo
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

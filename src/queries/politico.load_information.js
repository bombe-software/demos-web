import gql from 'graphql-tag';

export default gql`
query data($id: ID!) {
  politico(id: $id) {
    id
    nombre
    cargo
    estado {
      id
    }
    partido {
      id
    }
    estudios {
      id
      titulo
      grado_academico {
        id
      }
      lugar_estudio {
        id
      }
    }
  }
}
`;
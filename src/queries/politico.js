import gql from 'graphql-tag';

export default gql`
query data($id: ID!) {
  politico(id: $id) {
    id
    nombre
    propuestas {
      id
      titulo
    }
    eventos {
      id
      titulo 
      fecha
    }
    partido {
      nombre
    }
    estudios {
      id
      grado_academico {
        grado
      }
      lugar_estudio {
        nombre
      }
    }
  }
}
`;
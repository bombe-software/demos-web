import gql from 'graphql-tag';

export default gql`
query data($id: ID!) {
  politico(id: $id) {
    id
    nombre
    propuestas {
      id
      titulo
      fecha
      tipo_propuesta{
        id
        tipo
      }
    }
    eventos {
      id
      titulo 
      fecha
    }
    partido {
      id
      nombre
    }
    estudios {
      id
      titulo
      grado_academico {
        id
        grado
      }
      lugar_estudio {
        id
        nombre
      }
    }
  }
}
`;
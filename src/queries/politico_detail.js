import gql from 'graphql-tag';

export default gql`
query data($id: ID!) {
    politico(id: $id) {
      nombre
      propuestas{
        id
        titulo
      }
      eventos{
        id
        titulo
        fecha
      }
      partido{
        id
        nombre
      }
      estudios{
        id
        grado_academico{
          id
          grado
        }
        lugar_estudio{
          id
          nombre
        }
      }
    }
    {
      usuario_in{
        id
      }
    }
  }
`;
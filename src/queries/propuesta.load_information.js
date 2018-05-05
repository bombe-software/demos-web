import gql from 'graphql-tag';

export default gql`
query data($id: ID!) {
  propuesta(id: $id) {
    id
    titulo
    descripcion
    fecha
    tipo_propuesta {
      id
    }
    politico{
      id
    }
  }
}
`;
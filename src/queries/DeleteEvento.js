import gql from 'graphql-tag';

export default gql`
mutation DeleteEvento($id_evento: ID!, $id_usuario: ID!){
  deleteEvento(id_evento: $id_evento, id_usuario: $id_usuario){
    id
  }
}
`;
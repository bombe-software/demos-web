import gql from 'graphql-tag';

export default gql`
mutation delete_evento($id_usuario: ID, $id_evento: ID) {
    delete_evento(id_usuario: $id_usuario, id_evento: $id_evento) {
      id
    }
  }
  
`;
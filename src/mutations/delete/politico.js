import gql from 'graphql-tag';

export default gql`
mutation delete_politico($id_usuario: ID, $id_politico: ID) {
    delete_politico(id_usuario: $id_usuario, id_politico: $id_politico) {
      id
    }
  }
  
`;
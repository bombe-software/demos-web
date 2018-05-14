import gql from 'graphql-tag';

export default gql`
mutation delete_propuesta($id_usuario: ID, $id_propuesta: ID) {
    delete_propuesta(id_usuario: $id_usuario, id_propuesta: $id_propuesta) {
      id
    }
  }
  
`;
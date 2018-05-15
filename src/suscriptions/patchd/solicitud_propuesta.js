import gql from 'graphql-tag';

export default gql`
mutation patchd_add_propuesta($id_propuesta: ID){
  patchd_add_propuesta(id_propuesta: $id_propuesta){
    id
    } 
  }
`;
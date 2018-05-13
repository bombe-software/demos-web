import gql from 'graphql-tag';

export default gql`
mutation patch_add_propuesta($id_propuesta: ID){
  patch_add_propuesta(id_propuesta: $id_propuesta){
    id
    } 
  }
`;
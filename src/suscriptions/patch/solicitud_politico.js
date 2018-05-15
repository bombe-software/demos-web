import gql from 'graphql-tag';

export default gql`
mutation patch_add_politico($id_politico: ID){
    patch_add_politico(id_politico: $id_politico){
     id
       } 
   }
`;
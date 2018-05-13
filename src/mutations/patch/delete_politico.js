import gql from 'graphql-tag';

export default gql`
mutation patch_delete_politico($id_solicitud: ID){
    patch_delete_politico(id_solicitud: $id_solicitud){
      id
        } 
    }
`;
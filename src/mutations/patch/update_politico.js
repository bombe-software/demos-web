import gql from 'graphql-tag';

export default gql`
mutation patch_update_politico($id_solicitud: ID){
    patch_update_politico(id_solicitud: $id_solicitud){
      id
        } 
    }
`;
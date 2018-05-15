import gql from 'graphql-tag';

export default gql`
mutation patch_update_evento($id_solicitud: ID){
    patch_update_evento(id_solicitud: $id_solicitud){
      id
        } 
    }
`;
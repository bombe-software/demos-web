import gql from 'graphql-tag';

export default gql`
mutation patch_delete_evento($id_solicitud: ID){
    patch_delete_evento(id_solicitud: $id_solicitud){
      id
        } 
    }
`;
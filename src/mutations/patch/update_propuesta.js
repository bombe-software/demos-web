import gql from 'graphql-tag';

export default gql`
mutation patch_update_propuesta($id_solicitud: ID){
    patch_update_propuesta(id_solicitud: $id_solicitud){
      id
        } 
    }
`;
import gql from 'graphql-tag';

export default gql`
mutation patch_delete_propuesta($id_solicitud: ID){
    patch_delete_propuesta(id_solicitud: $id_solicitud){
      id
        } 
    }
`;
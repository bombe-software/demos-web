import gql from 'graphql-tag';

export default gql`
mutation patchd_delete_propuesta($id_solicitud: ID){
    patchd_delete_propuesta(id_solicitud: $id_solicitud){
      id
        } 
    }
`;
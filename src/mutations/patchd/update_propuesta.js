import gql from 'graphql-tag';

export default gql`
mutation patchd_update_propuesta($id_solicitud: ID){
    patchd_update_propuesta(id_solicitud: $id_solicitud){
      id
        } 
    }
`;
import gql from 'graphql-tag';

export default gql`
mutation patchd_update_evento($id_solicitud: ID){
    patchd_update_evento(id_solicitud: $id_solicitud){
      id
        } 
    }
`;
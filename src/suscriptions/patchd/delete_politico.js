import gql from 'graphql-tag';

export default gql`
mutation patchd_delete_politico($id_solicitud: ID){
    patchd_delete_politico(id_solicitud: $id_solicitud){
      id
        } 
    }
`;